const Tag = require("../models/Tag");

const createTag = (data) => {
	const tag = new Tag({
		title: data.title,
	});
	return tag;
};

// Middleware to get a tag document from tag id
const getTag = async (req, res, next) => {
	let tag = null;
	try {
		tag = await Tag.findById(req.params.tid);
		if (tag == null) {
			return res.status(404).json({ message: "Tag not found" });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}
	res.tag = tag;
	next();
};

exports.createTag = createTag;
exports.getTag = getTag;
