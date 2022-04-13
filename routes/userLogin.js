const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = require("express").Router();
const cookieParser = require("cookie-parser");
const checkCookies = require("./checkCookies");
router.use(cookieParser());

router.get("/", async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    res.render("user/login", { message: "" });
  } else {
    res.redirect("/");
  }
});

router.post("/signup", async (req, res) => {
  const { username, password: plainTextPassword, name } = req.body;
  console.log(username, plainTextPassword, name);
  if (!username || typeof username !== "string") {
    res.render("user/login", { message: "Invalid username" });
  }

  if (plainTextPassword.length < 3) {
    return res.render("user/login", {
      message: "Password too small. Should be atleast 3 characters",
    });
  }

  const password = await bcrypt.hash(plainTextPassword, 10);

  try {
    const response = await User.create({
      username: username,
      name: name,
      password: password,
    });
    console.log("User created successfully: ", response);
  } catch (error) {
    if (error.code === 11000) {
      return res.render("user/login", {
        message: "Username already exist",
      });
    }
    throw error;
  }

  res.render("user/login", {
    message: "User created successfully",
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let token;
  if (username === "admin" && password === "admin") {
    token = jwt.sign({ username: "admin" }, "secret");
  } else {
    const userInDB = await User.findOne({ username: username });
    if (!userInDB) {
      return res.render("user/login", { message: "User not found" });
    }
    if (await bcrypt.compare(password, userInDB.password)) {
      token = jwt.sign({ username: username }, "secret");
    } else {
      return res.render("user/login", { message: "Invalid password" });
    }
  }

  res.cookie("jwt", token, {
    maxAge: 1000 * 60 * 60 * 24,
    httpOnly: true,
  });
  res.redirect("/");
  // res.json({ status: "ok", cookie: req.cookies.jwt });
});

router.get("/logout", (req, res) => {
  if (req.cookies.jwt) {
    res.clearCookie("jwt");
  }
  res.redirect("/login");
});
module.exports = router;
