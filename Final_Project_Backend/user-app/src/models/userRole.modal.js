const mongoose = require("mongoose");

const userRoleSchema = new mongoose.Schema(
    {
        userRoleType: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    }
);

userRoleSchema.methods.toJSON = function () {
    const userRole = this;
    const userRoleObject = userRole.toObject();
    userRoleObject.id = userRoleObject._id;

    delete userRoleObject._id;

    return userRoleObject;
};

const UserRole = mongoose.model("UserRole", userRoleSchema);

module.exports = UserRole;
