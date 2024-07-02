const Page = require("../models/page");

exports.getPages = async (req, res) => {
  try {
    const userId = req.auth.userId;
    const pages = await Page.find({ userId });

    return res.status(200).json({ pages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.addPage = async (req, res) => {
  try {
    const userId = req.auth.userId;

    const { title, icon, comment, background } = req.body;

    const newPage = new Page({
      title,
      icon,
      comment,
      background,
      userId,
    });

    await newPage.save();

    return res
      .status(200)
      .json({ message: "Page added successfully", page: newPage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
