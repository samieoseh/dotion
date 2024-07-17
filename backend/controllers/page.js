const Page = require("../models/page");

const deletePageAndChildren = async (pageId, deletedIds) => {
  const deletedPage = await Page.findByIdAndDelete(pageId, { new: true });
  deletedIds.push(deletedPage._id);
  const childPages = await Page.find({ parentId: deletedPage._id });

  for (const page of childPages) {
    await deletePageAndChildren(page._id, deletedIds);
  }
};

const createPageWithChildren = async (
  userId,
  pageId,
  parentId,
  duplicatedPages,
) => {
  // Find the page by ID
  const page = await Page.findById(pageId);

  if (!page) {
    throw new Error(`Page with ID ${pageId} not found`);
  }

  // Create a copy of the page
  const newPage = new Page({
    ...page.toObject(),
    _id: undefined, // Ensure a new ID is generated
    userId,
    parentId,
  });

  const savedPage = await newPage.save();

  // Add the duplicated page to the array
  duplicatedPages.push(savedPage);

  // Find child pages
  const childPages = await Page.find({ parentId: pageId });

  // Recursively duplicate child pages
  for (const childPage of childPages) {
    await createPageWithChildren(
      userId,
      childPage._id,
      newPage._id,
      duplicatedPages,
    );
  }
};
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

exports.duplicatePage = async (req, res) => {
  console.log("body: ", req.body);
  try {
    // recursively create the necessary body
    const page = await Page.findOne({ _id: req.body._id });
    console.log({ page });
    const duplicatedPages = [];
    await createPageWithChildren(
      req.auth.userId,
      req.body._id,
      page.parentId,
      duplicatedPages,
    );
    return res
      .status(200)
      .json({ message: "Page deleted successfully", duplicatedPages });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deletePage = async (req, res) => {
  try {
    const deletedIds = [];
    await deletePageAndChildren(req.params.id, deletedIds);

    return res
      .status(200)
      .json({ message: "Page deleted successfully", deletedIds });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
