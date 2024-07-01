const express = require("express")
const router = express.Router();
const userCtrl = require('../controllers/user')

router.post("/signup", userCtrl.signup)
router.post('/signup-with-token', userCtrl.signupWithToken)

module.exports = router