const users_role_controller = require("../controller/user_role_controller");
const middleware = require("./../middleware/permissionCheck");

const router = require("express").Router();

router.get(
  "/showall/:id",
  middleware.permissionCheck,
  users_role_controller.get_user_role
);
router.post(
  "/add/:id",
  middleware.permissionCheck,
  users_role_controller.add_user_role
);

module.exports = router;
