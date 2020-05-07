const Bookmark = require("../models/Bookmark");
const request = require("request-promise");
const cheerio = require("cheerio");
const tagHelper = require("../bin/tag-helper");

const getTitleFromURL = async (url) => {
	const response = await request({
		uri: url,
	});
	let $ = cheerio.load(response);
	let title = $("title").text();
	return title;
};

const createBookmark = (data) => {
	// Create bookmark document
	const bookmark = new Bookmark({
		link: data.link,
		title: data.title,
		publisher: data.publisher,
	});
	// Create tags
	data.tags.map((tag) => {
		bookmark.tags.push(tagHelper.createTag(tag));
	});
	return bookmark;
};

// Middleware to get a bookmark document from bookmark id
const getBookmark = async (req, res, next) => {
	let bookmark = null;
	try {
		bookmark = await Bookmark.findById(req.params.bid).populate("tags");
		if (bookmark == null) {
			return res.status(404).json({ message: "Bookmark not found" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.bookmark = bookmark;
	next();
};

exports.getTitleFromURL = getTitleFromURL;
exports.createBookmark = createBookmark;
exports.getBookmark = getBookmark;
