const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif", "image/jpg"];
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
router.use(cookieParser());

// All products route
router.get("/", async (req, res) => {
  if (!req.cookies.jwt) {
    return res.redirect("/login");
  }

  let query = Product.find();
  if (req.query.name != null && req.query.name != "") {
    query = query.regex("name", new RegExp(req.query.name, "i"));
  }

  try {
    const products = await query.exec();
    res.render("products/index", {
      products: products,
      searchOptions: req.query,
    });
  } catch {
    res.redirect("/");
  }
});

// new product
router.get("/new", async (req, res) => {
  if (!req.cookies.jwt) {
    return res.redirect("/login");
  } else {
    const user = jwt.verify(req.cookies.jwt, "secret").username;
    if (user !== "admin") {
      return res.redirect("/");
    }
  }
  renderNewPage(res, new Product());
});

// create new product
router.post("/", async (req, res) => {
  const product = new Product({
    name: req.body.name,
    description: req.body.description,
    cost: req.body.cost,
  });

  saveCover(product, req.body.cover);

  try {
    const newProduct = await product.save();
    res.redirect(`products/${newProduct.id}`);
  } catch {
    renderNewPage(res, product, true);
  }
});

//show a certain product
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).exec();
    res.render("products/show", { product: product });
  } catch {
    res.redirect("/");
  }
});

// delete Product route
router.delete("/:id", async (req, res) => {
  const user = jwt.verify(req.cookies.jwt, "secret").username;
  if (user !== "admin") {
    return res.redirect("/");
  }

  let product;
  try {
    product = await Product.findById(req.params.id);
    await product.remove();
    res.redirect("/products");
  } catch {
    if (product != null) {
      res.render("products/show", {
        product: product,
        errorMessage: "could not remove product",
      });
    } else {
      res.redirect("/");
    }
  }
});

// edit product
router.get("/:id/edit", async (req, res) => {
  const user = jwt.verify(req.cookies.jwt, "secret").username;
  if (user !== "admin") {
    return res.redirect("/");
  }
  try {
    const product = await Product.findById(req.params.id);
    renderEditPage(res, product);
  } catch {
    res.redirect("/");
  }
});

// update product Route
//? continue from here
router.put("/:id", async (req, res) => {
  let product;
  try {
    product = await Product.findById(req.params.id);
    product.name = req.body.name;
    product.description = req.body.description;
    product.cost = req.body.cost;

    if (req.body.cover != null && req.body.cover !== "") {
      saveCover(product, req.body.cover);
    }
    await product.save();

    res.redirect(`/products/&{product.id}`);
  } catch {
    renderNewPage(res, product, true);
    if (product != null) {
      renderEditPage(res, product, true);
    } else {
      res.redirect("/");
    }
  }
});

async function renderFormPage(res, product, form, hasError = false) {
  try {
    const params = {
      product: product,
    };

    if (hasError) {
      if (form === "edit") {
        params.errorMessage = "Error Editing product";
      } else {
        params.errorMessage = "Error Updating product";
      }
    }

    res.render(`products/${form}`, params);
  } catch {
    res.redirect("/products");
  }
}

async function renderNewPage(res, product, hasError = false) {
  renderFormPage(res, product, "new", hasError);
}

async function renderEditPage(res, product, hasError = false) {
  renderFormPage(res, product, "edit", hasError);
}

function saveCover(product, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    product.coverImage = new Buffer.from(cover.data, "base64");
    product.coverImageType = cover.type;
  }
}

module.exports = router;
