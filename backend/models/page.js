const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
  title: { type: String, default: "" },
  icon: { type: String },
  blocks: { type: String, default: undefined },
  comment: { type: String },
  background: { type: String },
  backgroundId: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Page", pageSchema);
