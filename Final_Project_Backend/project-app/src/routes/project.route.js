const express = require("express");
const router = express.Router();
const projectController = require("../controllers/project.controller");

router.post("/add", projectController.add);
router.put("/update/:id", projectController.update);
router.get("/get/:id", projectController.get);
router.get("/get_all", projectController.getAll);
router.delete("/remove/:id", projectController.remove);

module.exports = router;
