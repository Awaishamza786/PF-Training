const router = require("express").Router();

const { show ,show_specific_user_session,save_all_user_working_time  } = require("./../../../controller/times_controller");

router.get("/show", show);
router.get("/showtoday/:email", show_specific_user_session);
router.get("/savetoday", save_all_user_working_time);


module.exports = router;
