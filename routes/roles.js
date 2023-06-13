const role_controller = require("./../controller/rolesController");
const middleware = require("./../middleware/permissionCheck");

const router = require("express").Router();

router.get("/showall", middleware.permissionCheck, role_controller.getRoles);
router.post("/add", middleware.permissionCheck, role_controller.addRole);

module.exports = router;
