const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

router.get("/", async (req, res) => {
  if (!req.cookies.jwt) {
    return res.redirect("/login");
  }
  let products;
  try {
    products = await Product.find().sort({ createAt: "desc" }).limit(15).exec();
  } catch {
    products = [];
  }
  res.render("index", { products: products });
});

module.exports = router;

// added a new commit
