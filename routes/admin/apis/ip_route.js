const router = require("express").Router();

const {
  saveIp,
  showRegisteredIp,
} = require("./../../../controller/ip_controller");

router.post("/save", saveIp);
router.get("/showregistered", showRegisteredIp);

module.exports = router;
