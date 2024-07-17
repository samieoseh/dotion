const express = require("express");
const router = express.Router();
const pageCtrl = require("../controllers/page");
const auth = require("../middlewares/auth");

router.get("/", auth, pageCtrl.getPages);
router.post("/", auth, pageCtrl.addPage);
router.post("/duplicate", auth, pageCtrl.duplicatePage);
router.patch("/:id", auth, pageCtrl.updatePage);
router.delete("/:id", auth, pageCtrl.deletePage);

module.exports = router;
