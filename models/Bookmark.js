const mongoose = require("mongoose");

// Schema for a bookmark
const bookmarkSchema = mongoose.Schema(
	{
		link: { type: String, required: true },
		title: { type: String, required: true },
		publisher: { type: String, required: true },
		tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Bookmark", bookmarkSchema);
