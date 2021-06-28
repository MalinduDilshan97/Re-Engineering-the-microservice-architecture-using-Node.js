const express = require('express');
const router = express.Router();
const projectRouter = require('./project.route')
const taskRouter = require('./task.route')

/* GET APP Details. */
router.get('/', function (req, res, next) {
    let response = {
        app_name: 'Project Manager API',
        developers: [{
            name: 'Malindu Dilshan',
        }],
    }
    res.status(200).send(response);
});

router.get('/status', (req, res) => {
    res.send({status: 'OK'})
}) // api status
router.get('/health', (req, res) => {
    res.send({status: 'OK'})
}) // api status

router.use('/projects', projectRouter); // project routes.
router.use('/tasks', taskRouter); // task routes.

module.exports = router;
