const logger = require("../config/logger/logger");
const projectService = require('../services/project.service')
const {BadRequest} = require('../utils/errors')
const Constants = require('../constants/constants')
const httpStatus = require('http-status')

const add = async (req, res, next) => {
    try {

        const project = req.body
        const data = await projectService.add(project)

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
        let data = await projectService.update(body, id)

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
        let data = await projectService.findById(id)

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
        let data = await projectService.remove(id)

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
        let data = await projectService.getAll()

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

module.exports = {
    add,
    get,
    getAll,
    remove,
    update
}