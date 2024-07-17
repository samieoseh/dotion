const mongoose = require("mongoose");

const pageSchema = mongoose.Schema({
  title: { type: String, default: "" },
  icon: { type: String },
  blocks: { type: String, default: undefined },
  isFavorite: { type: Boolean, default: false },
  comment: { type: String },
  background: { type: String },
  backgroundId: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Page",
    default: null,
  },
  createdAt: { type: Number },
});

module.exports = mongoose.model("Page", pageSchema);
