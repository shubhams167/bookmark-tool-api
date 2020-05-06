const express = require("express");
const router = express.Router();
const Tag = require("../models/Tag");

// Show all bookmarks having a particular tag
router.get("/:tag", (req, res) => {});

router.patch("/", (res, req) => {});

router.delete("/", (res, req) => {});

module.exports = router;
