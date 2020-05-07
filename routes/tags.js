const express = require("express");
const router = express.Router();
const Tag = require("../models/Tag");
const Bookmark = require("../models/Bookmark");
const tagHelper = require("../bin/tag-helper");

// Route to get all tags
router.get("/", async (req, res) => {
	try {
		const tags = await Tag.find();
		res.json(tags);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Route to get all bookmarks tagged with a specific tag
router.get("/:tag", async (req, res) => {
	try {
		let bookmarks = await Bookmark.find().populate("tags");
		bookmarks = bookmarks.filter((bookmark) => {
			return bookmark.tags.some((tag) => {
				let regex = new RegExp(`^${req.params.tag}$`, "i");
				return regex.test(tag.title);
			});
		});
		res.json(bookmarks);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
