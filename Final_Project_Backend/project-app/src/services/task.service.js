const Task = require('../models/task.modal')
const {GeneralError} = require('../utils/errors')
const logger = require('../config/logger/logger')
const projectService = require('../services/project.service')

const findById = async (id) => {
    try {
        const task = await Task.findById(id)
        return task
    } catch (error) {
        logger.error(error)
        throw new GeneralError('Something Went Wrong..')
    }
}

const add = async (task) => {
    try {

        const newTask = new Task({...task})
        task = await newTask.save()
        return task

    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

const update = async (task, id) => {
    try {
        const existingTask = await Task.findById(id)

        existingTask.name = task.name
        existingTask.description = task.description
        existingTask.startDate = task.startDate
        existingTask.endDate = task.endDate
        existingTask.status = task.status
        existingTask.assignee = task.assignee
        existingTask.project = task.project

        task = await existingTask.save()
        return task

    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

const remove = async (id) => {
    try {
        const task = await Task.findByIdAndDelete(id)
        return task
    } catch (error) {
        logger.error(error)
        throw new GeneralError('Something Went Wrong..')
    }
}

const getAll = async () => {
    try {
        const tasks = await Task.find()
        return tasks
    } catch (error) {
        logger.error(error)
        throw new GeneralError('Something Went Wrong..')
    }
}

const addAssignee = async (task) => {
    try {
        const existingTask = await Task.findById(task.id)
        existingTask.assignee = task.assignee

        task = await existingTask.save()
        return task

    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

const addProject = async (task) => {
    try {
        const existingTask = await Task.findById(task.id)
        existingTask.project = task.project

        task = await existingTask.save()
        return task

    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

const findByAssignee = async (id) => {
    try {
        const task = await Task.find({assignee: id})
        return task
    } catch (error) {
        logger.error(error)
        throw new GeneralError('Something Went Wrong..')
    }
}

const findByAssigneeAndProject = async (assigneeId, projectId) => {
    try {
        const task = await Task.find({assignee: assigneeId, project: projectId})
        return task
    } catch (error) {
        logger.error(error)
        throw new GeneralError('Something Went Wrong..')
    }
}


const findByProject = async (id) => {
    try {
        const task = await Task.find({project: id})
        return task
    } catch (error) {
        logger.error(error)
        throw new GeneralError('Something Went Wrong..')
    }
}

const getTasksWithProjectForAssignee = async (id) => {
    try {
        const tasksList = await Task.find({assignee: id})

        let projectIDList = []
        const projectWithTasks = []

        for (let i = 0; i < tasksList.length; i++) {
            const task = tasksList[i]
            const projectID = task.project.toString()
            if (!projectIDList.includes(projectID)) {
                projectIDList.push(projectID)
            }
        }

        for (let i = 0; i < projectIDList.length; i++) {
            const projectId = projectIDList[i]
            let project = await projectService.findById(projectId)
            let tasks = await findByAssigneeAndProject(id, projectId)

            let modifiedProject = JSON.stringify(project)
            modifiedProject = JSON.parse(modifiedProject)

            modifiedProject.tasks = tasks

            projectWithTasks.push(modifiedProject)
        }

        return projectWithTasks

    } catch (error) {
        logger.error(error)
        throw new GeneralError('Something Went Wrong..')
    }
}

module.exports = {
    add,
    findById,
    getAll,
    remove,
    update,
    addAssignee,
    addProject,
    findByAssignee,
    findByProject,
    getTasksWithProjectForAssignee
}
