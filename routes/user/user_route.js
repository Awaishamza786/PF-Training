
const router = require("express").Router();

const { login, logout } = require("../../controller/user_controller");
const {verifyToken}=require('./../../middleware/user_middleware')

const time = require("./sessions/times_route");


router.post("/login", login);
router.get("/logout", logout);
router.use("/times",verifyToken ,time);

module.exports = router;
