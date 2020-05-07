const express = require("express");
const router = express.Router();
const Bookmark = require("../models/Bookmark");
const Tag = require("../models/Tag");
const bookmarkHelper = require("../bin/bookmark-helper");
const tagHelper = require("../bin/tag-helper");

// Route to get all bookmarks
router.get("/", async (req, res) => {
	try {
		const bookmarks = await Bookmark.find().populate("tags");
		res.json(bookmarks);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Route to get a specific bookmark by providing bookmark id
router.get("/:bid", bookmarkHelper.getBookmark, (req, res) => {
	res.send(res.bookmark);
});

// Route to create a bookmark
router.post("/", async (req, res) => {
	try {
		// Check if link already exist or not
		const alreadyExist = await Bookmark.findOne({ link: req.body.link });
		if (alreadyExist) {
			return res.status(400).json({ message: "Bookmark already exist" });
		}
		// Set the title of the link, if not provided
		if (req.body.title == null) {
			req.body.title = await bookmarkHelper.getTitleFromURL(
				req.body.link
			);
		}
		const bookmarkDocument = bookmarkHelper.createBookmark(req.body);

		await bookmarkDocument.save();
		// Save tags in DB
		await Tag.insertMany(bookmarkDocument.tags);
		res.json({ message: "Saved successfully" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Route to delete a specific bookmark along with its tags
router.delete("/:bid", bookmarkHelper.getBookmark, async (req, res) => {
	try {
		await res.bookmark.deleteOne();
		res.json({ message: "Bookmark deleted" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Route to update a specific bookmark
router.patch("/:bid", bookmarkHelper.getBookmark, async (req, res) => {
	// Check if user requested to update the title
	if (req.body.title) {
		res.bookmark.title = req.body.title;
	}
	// Check if user requested to update the publisher
	if (req.body.publisher) {
		res.bookmark.publisher = req.body.publisher;
	}
	// Update the bookmark
	try {
		await res.bookmark.save();
		res.json({ message: "Update successful" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Route to get all tags associated with a bookmark
router.get("/:bid/tags", bookmarkHelper.getBookmark, async (req, res) => {
	res.json(res.bookmark.tags);
});

// Route to add a new tag to a bookmark
router.post("/:bid/tags", bookmarkHelper.getBookmark, async (req, res) => {
	try {
		let bookmark = res.bookmark;
		// Check if a tag already exist with same title
		const alreadyExist = bookmark.tags.some((tag) => {
			let regex = new RegExp(`^${req.body.title}$`, "i");
			return regex.test(tag.title);
		});
		if (alreadyExist) {
			return res
				.status(400)
				.json({ message: "Tag already exist in the bookmark" });
		}
		const tag = tagHelper.createTag(req.body);
		bookmark.tags.push(tag);
		// Save tag in DB
		await Tag.insertMany(tag);
		await res.bookmark.save();
		res.json({ message: "Tag added" });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// Route to get a tag of a specific bookmark
router.get("/:bid/tags/:tid", tagHelper.getTag, async (req, res) => {
	res.json(res.tag);
});

// Route to delete a tag from a specific bookmark
router.delete(
	"/:bid/tags/:tid",
	bookmarkHelper.getBookmark,
	tagHelper.getTag,
	async (req, res) => {
		try {
			let bookmark = res.bookmark;
			// Remove tag from DB
			await res.tag.remove();
			// Remove tag from bookmark tags field
			bookmark.tags = bookmark.tags.filter(
				(tag) => tag._id != req.params.tid
			);
			// Update bookmark in DB
			await bookmark.save();
			res.json({ message: "Tag deleted" });
		} catch (err) {
			res.status(500).json({ message: err.message });
		}
	}
);

module.exports = router;
