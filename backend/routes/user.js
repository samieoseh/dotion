const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middlewares/auth");

router.get("/", auth, userCtrl.getUser);
router.patch("/:id", auth, userCtrl.updateUser);

module.exports = router;
