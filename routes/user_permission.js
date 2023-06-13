const users_permission_controller = require("./../controller/user_permission_controller");
const middleware = require("./../middleware/permissionCheck");

const router = require("express").Router();

router.get(
  "/showall/:id",
  middleware.permissionCheck,
  users_permission_controller.get_user_permission
);
router.post(
  "/add/:id",
  middleware.permissionCheck,
  users_permission_controller.add_user_Permission
);

module.exports = router;
