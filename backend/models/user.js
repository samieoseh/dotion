const mongoose = require('mongoose')

const recentlyVisitedSchema = mongoose.Schema({
  pageId: { type: mongoose.Schema.Types.ObjectId, ref: "Page" },
  visitedAt: { type: Number },
});

const userSchema = mongoose.Schema({
  picture: { type: String },
  name: { type: String },
  email: { type: String, required: true },
  emailVerified: { type: Boolean },
  googleId: { type: String, index: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: { type: Date },
  recentlyVisited: [
    {
      type: recentlyVisitedSchema,
    },
  ],
});

module.exports = mongoose.model('User', userSchema);