const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        startDate: {
            type: String,
            required: true,
        },
        deadline: {
            type: String,
            required: true,
        },
        projectAdmin: {
            type: String,
            required: true,
        },
        projectClient: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

projectSchema.methods.toJSON = function () {
    const task = this;
    const taskObject = task.toObject();
    taskObject.id = taskObject._id;

    delete taskObject._id;

    return taskObject;
};

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
