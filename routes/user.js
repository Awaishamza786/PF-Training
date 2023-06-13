const user_controller = require("./../controller/userController");
const middleware = require("./../middleware/permissionCheck");

const router = require("express").Router();

router.get("/showall", middleware.permissionCheck, user_controller.getUser);
router.post("/add", middleware.permissionCheck, user_controller.addUser);

module.exports = router;
