const logger = require("../config/logger/logger");
const TaskService = require('../services/task.service')
const {BadRequest} = require('../utils/errors')
const Constants = require('../constants/constants')
const httpStatus = require('http-status')

const add = async (req, res, next) => {
    try {

        const body = req.body
        const data = await TaskService.add(body)

        if (data != null) {
            let response = {
                message: Constants.customMessage.CREATED,
                data,
            }
            res.status(httpStatus.CREATED).send(response)
        } else {
            throw new BadRequest('Something Went Wrong')
        }
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const update = async (req, res, next) => {
    try {
        let id = req.param('id');
        let body = req.body
        let data = await TaskService.update(body, id)

        if (data != null) {
            let response = {
                message: Constants.customMessage.SUCCESSFUL,
                data,
            }
            res.status(httpStatus.OK).send(response)
        } else {
            throw new BadRequest('Something Went Wrong')
        }

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const get = async (req, res, next) => {
    try {
        let id = req.param('id');
        let data = await TaskService.findById(id)

        if (data != null) {
            let response = {
                message: Constants.customMessage.SUCCESSFUL,
                data,
            }
            res.status(httpStatus.OK).send(response)
        } else {
            throw new BadRequest('Cannot Find Project.')
        }

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const remove = async (req, res, next) => {
    try {
        let id = req.param('id');
        let data = await TaskService.remove(id)

        if (data != null) {
            let response = {
                message: Constants.customMessage.REMOVED,
                data,
            }
            res.status(httpStatus.OK).send(response)
        } else {
            throw new BadRequest('Cannot Find Project.')
        }

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const getAll = async (req, res, next) => {
    try {
        let data = await TaskService.getAll()

        if (data != null) {
            let response = {
                message: Constants.customMessage.SUCCESSFUL,
                data,
            }
            res.status(httpStatus.OK).send(response)
        } else {
            throw new BadRequest('Cannot Find User.')
        }

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const addAssignee = async (req, res, next) => {
    try {

        const body = req.body
        const data = await TaskService.addAssignee(body)

        if (data != null) {
            let response = {
                message: Constants.customMessage.CREATED,
                data,
            }
            res.status(httpStatus.CREATED).send(response)
        } else {
            throw new BadRequest('Something Went Wrong')
        }
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const addProject = async (req, res, next) => {
    try {

        const body = req.body
        const data = await TaskService.addProject(body)

        if (data != null) {
            let response = {
                message: Constants.customMessage.CREATED,
                data,
            }
            res.status(httpStatus.CREATED).send(response)
        } else {
            throw new BadRequest('Something Went Wrong')
        }
    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const findByAssignee = async (req, res, next) => {
    try {
        let id = req.param('id');
        let data = await TaskService.findByAssignee(id)

        if (data != null) {
            let response = {
                message: Constants.customMessage.SUCCESSFUL,
                data,
            }
            res.status(httpStatus.OK).send(response)
        } else {
            throw new BadRequest('Cannot Find Project.')
        }

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const findByProject = async (req, res, next) => {
    try {
        let id = req.param('id');
        let data = await TaskService.findByProject(id)

        if (data != null) {
            let response = {
                message: Constants.customMessage.SUCCESSFUL,
                data,
            }
            res.status(httpStatus.OK).send(response)
        } else {
            throw new BadRequest('Cannot Find Project.')
        }

    } catch (error) {
        logger.error(error)
        next(error)
    }
}

const getTasksWithProjectForAssignee = async (req, res, next) => {
    try {
        let id = req.param('id');
        let data = await TaskService.getTasksWithProjectForAssignee(id)

        if (data != null) {
            let response = {
                message: Constants.customMessage.SUCCESSFUL,
                data,
            }
            res.status(httpStatus.OK).send(response)
        } else {
            throw new BadRequest('Cannot Find Data.')
        }

    } catch (error) {
        logger.error(error)
        next(error)
    }
}


module.exports = {
    add,
    get,
    getAll,
    remove,
    update,
    addAssignee,
    addProject,
    findByAssignee,
    findByProject,
    getTasksWithProjectForAssignee
}
