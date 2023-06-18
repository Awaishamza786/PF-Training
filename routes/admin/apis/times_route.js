const router = require("express").Router();

const { show ,show_specific_user_session  } = require("./../../../controller/times_controller");

router.get("/show", show);
router.get("/showtoday/:email", show_specific_user_session);


module.exports = router;
