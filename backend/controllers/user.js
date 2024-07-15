const User = require("../models/user");

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.auth.userId }).populate(
      "recentlyVisited.pageId",
    );
    console.log({ user });

    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      { _id: req.params.id },
      { ...req.body },
      { new: true },
    ).populate("recentlyVisited.pageId");
    console.log();
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};