const logger = require("../config/logger/logger");
const Constants = require('../constants/constants')
const httpStatus = require('http-status')
const {getInstanceData, getInstanceForServiceCommunication} = require('discovery-client-eureka')
const axios = require('axios').default;
const { get } = require("../routes");
const { post } = require("../../app");

const routeHandler = async (req, res, next) => {
    let serviceName = req.params.serviceType

    let host = getInstanceForServiceCommunication(serviceName)
    let urlSplit = req.originalUrl.split("/");
    let applicableUrlArray = urlSplit.slice(3, urlSplit.length)
    let servicePath = applicableUrlArray.join('/')
    let fullURL = req.protocol + '://' + host + '/' + servicePath;
    let headers = req.headers

    let data = null
    let responseCode = 404
    let responseHeaders= {}
    if(req.method === "GET") {
        try {
            const response = await axios.get(fullURL, req.body, headers)
            data = response.data
            responseCode = response.status
            responseHeaders = response.headers
        } catch(error) {
            if (error.response) {
                data = error.response.data
                responseHeaders = error.response.headers
                responseCode = error.response.status
            }
        }
    } else if(req.method === "POST") {
        try {
            const response = await axios.post(fullURL, req.body, headers)
            data = response.data
            responseCode = response.status
            responseHeaders = response.headers
        } catch(error) {
            if (error.response) {
                data = error.response.data
                responseHeaders = error.response.headers
                responseCode = error.response.status
            }
        }
    } else if(req.method === "PUT") {
        try {
            const response = await axios.put(fullURL, req.body, headers)
            data = response.data
            responseCode = response.status
            responseHeaders = response.headers
        } catch(error) {
            if (error.response) {
                data = error.response.data
                responseHeaders = error.response.headers
                responseCode = error.response.status
            }
        }
    } else if(req.method === "PATCH") {
        try {
            const response = await axios.patch(fullURL, req.body, headers)
            data = response.data
            responseCode = response.status
            responseHeaders = response.headers
        } catch(error) {
            if (error.response) {
                data = error.response.data
                responseHeaders = error.response.headers
                responseCode = error.response.status
            }
        }
    } else if(req.method === "DELETE") {
        try {
            const response = await axios.delete(fullURL, req.body, headers)
            data = response.data
            responseCode = response.status
            responseHeaders = response.headers
        } catch(error) {
            if (error.response) {
                data = error.response.data
                responseHeaders = error.response.headers
                responseCode = error.response.status
            }
        }
    } else {
        res.send({"servers":host} , 400)
    }
    res.send(data, 200)
}

module.exports = routeHandler
