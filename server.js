require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.port || 3000
const path = require('path')
const mongoose = require("mongoose");
const connectDB = require("./config/dbconn");

//connect to mongodb
connectDB();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "/public"))); // to serve static files

//routes
app.use("/", require("./router/root"));

// handeling trying to acces non exisiting pages
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});


mongoose.connection.once("open", () => {
    console.log("connected to MongoDB");
    app.listen(port, () => console.log(`server runing on port ${port}`));
});



















// -----------------------------------v
// this is new commit at 3:42

console.log("this is new commit for testing");

// -----------------------------------
