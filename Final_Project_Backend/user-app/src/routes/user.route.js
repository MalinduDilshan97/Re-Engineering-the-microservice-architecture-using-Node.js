const express = require("express");
const router = express.Router();
const userControler = require("../controllers/user.controller");
const passport = require("passport");
const checkUserRole = require('../middleware/checkUserRole')

router.post("/add", userControler.addUser);
router.post("/login", userControler.login);
router.put("/update/:id", userControler.updateUser);
router.get("/get/:id", userControler.getUser);
router.get("/get_all", userControler.getAllUsers);
router.delete("/remove/:id", userControler.removeUser);
router.post("/user-role", userControler.addUserRole);
router.get("/user-role", userControler.getAllUserRoles);

router.get(
    "/protected",
    passport.authenticate("jwt", {session: false}),
    (req, res, next) => {
        res
            .status(200)
            .json({
                success: true,
                msg: "You are successfully authenticated to this route!",
            });
    }
);

router.get("/admin", passport.authenticate("jwt", {session: false}), checkUserRole(['admin']),
    (req, res, next) => {
        res
            .status(200)
            .json({
                success: true,
                msg: "You are successfully authenticated to this admin route!",
            });
    }
);

module.exports = router;
