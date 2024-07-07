const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
  title: { type: String, default: "" },
  icon: { type: String },
  comment: { type: String },
  background: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Page", pageSchema);
