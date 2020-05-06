const express = require("express");
const router = express.Router();
const Bookmark = require("../models/Bookmark");
const Tag = require("../models/Tag");

const createBookmark = (data) => {
	// Create bookmark
	const bookmark = new Bookmark({
		link: data.link,
		title: data.title,
		publisher: data.publisher,
	});
	// Create tags
	data.tags.map((tag) => {
		bookmark.tags.push(
			new Tag({
				title: tag.title,
			})
		);
	});
	return bookmark;
};

router.get("/", async (req, res) => {
	try {
		const bookmarks = await Bookmark.find().populate("tags");
		res.json(bookmarks);
	} catch (err) {
		res.json({ message: err.message });
	}
});

router.post("/", async (req, res) => {
	try {
		const bookmark = createBookmark(req.body);
		Tag.insertMany(bookmark.tags);
		const result = await bookmark.save();
		res.json(result);
	} catch (err) {
		res.json({ message: err.message });
	}
});

module.exports = router;
