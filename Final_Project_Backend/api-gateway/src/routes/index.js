const express = require('express');
const router = express.Router();
const routeHandler = require('../controllers/apiGateway.controller')

/* GET APP Details. */
router.use('/:serviceType', routeHandler);

module.exports = router;
