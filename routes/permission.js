const permission_controller = require("./../controller/permissionController");
const middleware = require("./../middleware/permissionCheck");

const router = require("express").Router();

router.get(
  "/showall",
  middleware.permissionCheck,
  permission_controller.getPermission
);
router.post(
  "/add",
  middleware.permissionCheck,
  permission_controller.addPermission
);

module.exports = router;
