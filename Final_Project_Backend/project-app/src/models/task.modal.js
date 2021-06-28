const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
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
            trim: true,
        },
        endDate: {
            type: String,
            required: true,
            trim: true,
        },
        status: {
            type: String,
            default: "TODO",
        },
        assignee: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
        },
    },
    {
        timestamps: true,
    }
);

taskSchema.methods.toJSON = function () {
    const task = this;
    const taskObject = task.toObject();
    taskObject.id = taskObject._id;

    delete taskObject._id;

    return taskObject;
};

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
