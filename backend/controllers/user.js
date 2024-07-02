const User = require("../models/user");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.auth.userId });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
