const logger = require("../config/logger/logger");
const userService = require('../services/user.service')
const {BadRequest} = require('../utils/errors')
const Constants = require('../constants/constants')
const httpStatus = require('http-status')

const login = async (req, res, next) => {
    try {
        let data = await userService.login(req.body)
        let response = {
            message: Constants.userMessage.LOGIN_SUCCESS,
            data,
        }
        res.status(httpStatus.OK).send(response)
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const addUser = async (req, res, next) => {
    try {
        let userStatus = await userService.findDuplicateUsers(req.body.email)
        if (!userStatus) {
            let user = req.body
            let data = await userService.addUser(user)
            let response = {
                message: Constants.userMessage.SIGNUP_SUCCESS,
                data,
            }
            res.status(httpStatus.CREATED).send(response)
        } else {
            throw new BadRequest('Email Already exsists.')
        }
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const updateUser = async (req, res, next) => {
    try {
        let userId = req.param('id');
        let user = req.body
        let data = await userService.updateUser(user, userId)
        let response = {
            message: Constants.userMessage.SUCCESSFUL,
            data,
        }
        res.status(httpStatus.OK).send(response)

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const getUser = async (req, res, next) => {
    try {
        let userId = req.param('id');
        let user = await userService.findUserById(userId)
        let response = {
            message: Constants.userMessage.SUCCESSFUL,
            user,
        }
        if (user != null) {
            res.status(httpStatus.OK).send(response)
        } else {
            throw new BadRequest('Cannot Find User.')
        }

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const removeUser = async (req, res, next) => {
    try {
        let userId = req.param('id');
        let user = await userService.removeUser(userId)
        let response = {
            message: Constants.userMessage.REMOVED,
            user,
        }
        if (user != null) {
            res.status(httpStatus.OK).send(response)
        } else {
            throw new BadRequest('Cannot Find User.')
        }

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const getAllUsers = async (req, res, next) => {
    try {

        let data = await userService.getAllUsers()
        let response = {
            message: Constants.userMessage.SUCCESSFUL,
            data,
        }
        if (data != null) {
            res.status(httpStatus.OK).send(response)
        } else {
            throw new BadRequest('Cannot Find User.')
        }

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const addUserRole = async (req, res, next) => {
    try {
        let userRole = req.body
        let data = await userService.addUserRole(userRole)
        let response = {
            message: Constants.userMessage.SUCCESSFUL,
            data,
        }
        res.status(httpStatus.OK).send(response)

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const getAllUserRoles = async (req, res, next) => {
    try {

        let data = await userService.getAllUserRoles()
        let response = {
            message: Constants.userMessage.SUCCESSFUL,
            data,
        }
        if (data != null) {
            res.status(httpStatus.OK).send(response)
        } else {
            throw new BadRequest('Cannot Find User Roles.')
        }

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

module.exports = {
    addUser,
    login,
    getUser,
    getAllUsers,
    removeUser,
    updateUser,
    addUserRole,
    getAllUserRoles
}
