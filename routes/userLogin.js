const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();

router.get("/", async (req, res) => {
  res.render("user/login");
});

module.exports = router;
