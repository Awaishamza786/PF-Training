const router = require("express").Router();


const { show_specific } = require("../../../controller/times_controller");

router.post("/showspecific/:email", show_specific);

module.exports = router;
