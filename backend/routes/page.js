const express = require("express");
const router = express.Router();
const pageCtrl = require("../controllers/page");
const auth = require("../middlewares/auth");

router.get("/", auth, pageCtrl.getPages);
router.post("/", auth, pageCtrl.addPage);

module.exports = router;
