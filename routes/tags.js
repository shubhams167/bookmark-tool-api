const express = require("express");
const router = express.Router();
const Tag = require("../models/Tag");
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

// Route to get an tag
router.get("/:tid", tagHelper.getTag, (req, res) => {
	res.json(res.tag);
});

router.patch("/", (res, req) => {});

router.delete("/", (res, req) => {});

module.exports = router;
