const express = require("express");
const router = express.Router();
const authCtrl = require("../controllers/auth.js");
const auth = require("../middlewares/auth.js");

router.post("/login", authCtrl.login);
router.post("/login-with-token", authCtrl.loginUserWithGoogleToken);
router.post("/send-token", authCtrl.sendToken);
router.post("/refresh", auth, authCtrl.loginWithToken);

module.exports = router;
