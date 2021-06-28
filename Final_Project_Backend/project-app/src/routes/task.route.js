const express = require("express");
const router = express.Router();
const taskController = require("../controllers/task.controller");

router.post("/add", taskController.add);
router.put("/update/:id", taskController.update);
router.get("/get/:id", taskController.get);
router.get("/get_all", taskController.getAll);
router.delete("/remove/:id", taskController.remove);
router.put("/add_assignee", taskController.addAssignee);
router.put("/add_project", taskController.addProject);
router.get("/assignee/:id", taskController.findByAssignee);
router.get("/project/:id", taskController.findByProject);
router.get("/task_project/:id", taskController.getTasksWithProjectForAssignee);

module.exports = router;
