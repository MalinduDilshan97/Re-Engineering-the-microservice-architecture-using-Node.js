const Project = require('../models/project.modal')
const {GeneralError} = require('../utils/errors')
const logger = require('../config/logger/logger')

const findById = async (id) => {
    try {
        const project = await Project.findById(id)
        return project
    } catch (error) {
        logger.error(error)
        throw new GeneralError('Something Went Wrong..')
    }
}

const add = async (project) => {
    try {

        const newProject = new Project({...project})
        project = await newProject.save()
        return project

    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

const update = async (project, id) => {
    try {
        const existingProject = await Project.findById(id)

        existingProject.name = project.name
        existingProject.description = project.description
        existingProject.startDate = project.startDate
        existingProject.deadline = project.deadline
        existingProject.projectAdmin = project.projectAdmin
        existingProject.projectClient = project.projectClient

        project = await existingProject.save()
        return project

    } catch (error) {
        logger.error(error)
        throw new Error(error)
    }
}

const remove = async (id) => {
    try {
        const project = await Project.findByIdAndDelete(id)
        return project
    } catch (error) {
        logger.error(error)
        throw new GeneralError('Something Went Wrong..')
    }
}

const getAll = async () => {
    try {
        const projects = await Project.find()
        return projects
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
    update
}