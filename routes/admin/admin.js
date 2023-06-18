const router = require("express").Router();

const time = require("./apis/times_route");
const user_route = require("./apis/user_route");
const ip_route = require("./apis/ip_route");

// const time = require("./sessions");

// router.post("/login", login);
// router.get("/logout", logout);
router.use("/times", time);
router.use("/user/", user_route);
router.use("/ip/", ip_route);
module.exports = router;
