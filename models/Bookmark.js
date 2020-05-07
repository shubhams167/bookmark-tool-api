const mongoose = require("mongoose");
const Tag = require("./Tag");
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

// Middleware to delete all referenced tags after deleting a bookmark
bookmarkSchema.post("deleteOne", { document: true }, async (doc, next) => {
	try {
		await Tag.deleteMany({ _id: { $in: doc.tags } });
		next();
	} catch (err) {
		next(err);
	}
});

module.exports = mongoose.model("Bookmark", bookmarkSchema);
