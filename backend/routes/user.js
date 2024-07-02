const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");

router.get("/", auth, userCtrl.getUser);

module.exports = router;
