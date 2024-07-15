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

    const { title, icon, comment, background, parentId } = req.body;

    const newPage = new Page({
      title,
      icon,
      comment,
      background,
      userId,
      parentId,
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

exports.updatePage = async (req, res) => {
  console.log(req.body);
  try {
    const updatedPage = await Page.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true },
    );
    return res
      .status(200)
      .json({ message: "Page updated successfully", updatedPage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deletePage = async (req, res) => {
  try {
    const deletedPage = await Page.findByIdAndDelete(req.params.id, {
      new: true,
    });
    return res
      .status(200)
      .json({ message: "Page deleted successfully", deletedPage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
