const httpStatus = require('http-status')
const constents = require('../constants/constants')

const checkUserRole = (roles) => (req, res, next) =>
    !roles.includes(req.user.role)
        ? res.status(httpStatus.FORBIDDEN).json({msg: constents.requestValidationMessage.FORBIDDEN})
        : next();

module.exports = checkUserRole