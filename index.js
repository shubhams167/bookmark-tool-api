const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

const bookmarkRoute = require("./routes/bookmarks");
const tagRoute = require("./routes/tags");

app.use(express.json());
app.use("/api/bookmarks", bookmarkRoute);
app.use("/api/tags", tagRoute);

app.get("/", (req, res) => {
	res.send("Hello World!");
});

// Connect to the database
mongoose.connect(
	process.env.DB_CONN_STRING,
	{ useUnifiedTopology: true, useNewUrlParser: true },
	() => console.log("Connected to DB!")
);

app.listen(3000, () => console.log("Server started successfully"));
