const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv/config");

const bookmarkRoute = require("./routes/bookmark");
const tagRoute = require("./routes/tag");

app.use(express.json());
app.use("/bookmark", bookmarkRoute);
app.use("/tag", tagRoute);

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
