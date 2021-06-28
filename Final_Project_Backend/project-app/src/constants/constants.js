const {UNAUTHORIZED} = require("http-status");

module.exports = {
    defaultServerResponse: {
        status: 400,
        message: '',
        body: {}
    },
    customMessage: {
        SUCCESSFUL: "Success",
        REMOVED: "Successfully Removed",
        CREATED: "Created"
    },
    requestValidationMessage: {
        BAD_REQUEST: 'Invalid fields',
        TOKEN_MISSING: 'Token missing from header',
        FORBIDDEN: 'Forbidden'
    },
    databaseMessage: {
        INVALID_ID: 'Invalid Id'
    },
    serverMessage: {
        SERVERERROR: 'Something Went Wrong : Service -'
    }
}