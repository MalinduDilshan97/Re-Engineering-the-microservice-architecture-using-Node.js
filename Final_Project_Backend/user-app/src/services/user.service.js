const User = require('../models/user.modal')
const UserRole = require('../models/userRole.modal')
const {GeneralError, BadRequest} = require('../utils/errors')
const {validPassword, genPassword, issueJWT} = require('../utils/utils')
const logger = require('../config/logger/logger')
const redis = require('../config/database/redis')
const { use } = require('../routes')

const findUserById = async (userId) => {
    let cacheData = await getDataRedies(`opus.allUsers.${userId}`);
    try {
        if(cacheData) {
            console.log("cache hit")
            return cacheData
        } else {
            console.log("cache miss")
            const user = await User.findById(userId)
            storeDataRedies(`opus.allUsers.${userId}`, user)
            return user
        }
    } catch (error) {
        logger.error(error)
        throw new GeneralError('Something Went Wrong..')
    }
}

const findDuplicateUsers = async (email) => {
    try {
        let userStatus = await User.findDuplicateEmails(email)
        return userStatus
    } catch (error) {
        logger.error(error)
        throw new GeneralError('Something Went Wrong..')
    }
};

const login = async ({email, password}) => {
    try {
        let user = await User.findOne({email});
        if (user) {
            let passwordIsValid = await validPassword(password, user)
            if (passwordIsValid) {
                const signedJWT = issueJWT(user)
                user.tokens = user.tokens.concat({token: signedJWT.token})
                await user.save()
                let data = {
                    user,
                    ...signedJWT
                }
                return data
            }
        } else {
            throw new BadRequest("Email Not Found")
        }
    } catch (error) {
        logger.error(error)
        if (error instanceof BadRequest) {
            throw new BadRequest(error)
        } else {
            console.log('error', error)
            throw new GeneralError('Something Went Wrong..')
        }
    }
}

/**
 * @param {*} user - User data from the rest endpoint
 * @returns - returns registered user data with tokens
 */
const addUser = async (user) => {
    try {
        /****
         * This uses bcrypt to hash user passwords
         */
        const hashPassword = await genPassword(user.password)
        user.password = hashPassword

        /****
         * This uses bcrypt to hash user passwords
         */
        const newUser = new User({...user})
        user = await newUser.save()

        /**
         * Generate a signed jwt and save it in jwt token list for new user
         */
        const signedJWT = issueJWT(user)
        newUser.tokens = newUser.tokens.concat({token: signedJWT.token})
        await newUser.save()

        let data = {
            user,
            ...signedJWT
        }
        flushKeys("opus.allUsers")
        return data
    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

const updateUser = async (user, user_id) => {
    try {
        /****
         * This uses bcrypt to hash user passwords
         */
        const hashPassword = await genPassword(user.password)
        user.password = hashPassword

        const existingUser = await User.findById(user_id)

        /****
         * This uses bcrypt to hash user passwords
         */
        existingUser.password = user.password
        existingUser.email = user.email
        existingUser.name = user.name
        existingUser.age = user.age
        user = await existingUser.save()

        /**
         * Generate a signed jwt and save it in jwt token list for new user
         */
        const signedJWT = issueJWT(user)
        existingUser.tokens = existingUser.tokens.concat({token: signedJWT.token})
        await existingUser.save()

        let data = {
            user,
            ...signedJWT
        }
        flushKeys("opus.allUsers")
        return data
    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

const removeUser = async (user_id) => {
    try {
        const user = await User.findByIdAndDelete(user_id)
        return user
    } catch (error) {
        logger.error(error)
        throw new GeneralError('Something Went Wrong..')
    }
}

const getAllUsers = async () => {
    try {
        let cacheData = await getDataRedies("opus.allUsers");
        if(cacheData) {
            console.log("cache hit")
            return cacheData
        } else {
            const users = await User.find()
            console.log("cache miss")
            storeDataRedies("opus.allUsers", users)
            return users
        }

    } catch (error) {
        logger.error(error)
        throw new GeneralError('Something Went Wrong..')
    }
}

const addUserRole = async (userRole) => {
    try {
        const newUserRole = new UserRole({...userRole})
        userRole = await newUserRole.save()
        return userRole
    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

const getAllUserRoles = async () => {
    try {
        const userRoles = await UserRole.find()
        return userRoles
    } catch (error) {
        logger.error(error)
        throw new GeneralError('Something Went Wrong..')
    }
}

const storeDataRedies = async (key, value) => {
    value = JSON.stringify(value)
    if(typeof key === "string") {
        redis.set(key, value);
    } else {
        throw new GeneralError('Keys Must be in string format..')
    } 
}

const getDataRedies = async (key) => {
    try {
        let data = await redis.get(key)
        return JSON.parse(data);
    } catch (error) {
        throw new GeneralError(error)
    }
}

const flushKeys = async(key) => {
    try {
        redis.del(key)
    } catch (error) {
        throw new GeneralError(error)
    }
}

module.exports = {
    addUser,
    login,
    findDuplicateUsers,
    findUserById,
    getAllUsers,
    removeUser,
    updateUser,
    addUserRole,
    getAllUserRoles
}
