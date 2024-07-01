const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  avatar: { type: String },
  name: { type: String },
  email: { type: String, required: true },
  emailVerifield: { type: Boolean },
  googleId: { type: String, index: true },
  createdAt: { type: Date, default: Date.now() },
  updatedAt: {type: Date},
})

module.exports = mongoose.model('User', userSchema);