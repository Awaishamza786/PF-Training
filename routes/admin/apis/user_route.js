const router = require("express").Router();

const {
  userSave,
  showUsers
} = require("./../../../controller/user_controller");

router.post("/add", userSave);
router.get("/showall", showUsers);


module.exports = router;
