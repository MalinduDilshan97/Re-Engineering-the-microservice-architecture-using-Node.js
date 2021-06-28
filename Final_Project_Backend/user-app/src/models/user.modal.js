const mongoose = require("mongoose");
const validator = require("validator");
const {BadRequest, GeneralError} = require("../utils/errors");
const {issueJWT} = require("../utils/utils");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
            validate(value) {
                if (!validator.isEmail(value)) {
                    throw new BadRequest("Email is invalid");
                }
            },
        },
        userName: {
            type: String,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 7,
            trim: true,
            validate(value) {
                if (value.toLowerCase().includes("password")) {
                    throw new BadRequest('Password cannot contain "password"');
                }
            },
        },
        role: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "UserRole",
        },
        tokens: [
            {
                token: {
                    type: String,
                    required: false,
                },
            },
        ],
        devProjects: [{type: mongoose.Schema.Types.ObjectId, ref: "Project"}],
        adminProjects: [{type: mongoose.Schema.Types.ObjectId, ref: "Project"}],
    },
    {
        timestamps: true,
    }
);

userSchema.virtual("tasks", {
    ref: "Task",
    localField: "_id",
    foreignField: "owner",
});

userSchema.statics.findDuplicateEmails = async function (email) {
    try {
        let user = await this.findOne({email}).lean();
        if (user) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        throw new GeneralError(error);
    }
};

userSchema.methods.generateAuthToken = async function () {
    try {
        const user = this;
        const signedJWT = issueJWT(user);
        user.tokens = user.tokens.concat({token: signedJWT.token});
        await user.save();
        return signedJWT;
    } catch (error) {
        throw new GeneralError(error);
    }
};

userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    userObject.id = userObject._id;

    delete userObject._id;
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.__v;

    return userObject;
};

module.exports = mongoose.model("User", userSchema);
