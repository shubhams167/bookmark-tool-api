const mongoose = require("mongoose");

// Schema for a tag
const tagSchema = mongoose.Schema(
	{
		title: { type: String, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Tag", tagSchema);
