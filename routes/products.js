const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const imageMimeTypes = ["image/jpeg", "image/png", "images/gif", "image/jpg"];



// All products route
router.get("/", async (req, res) => {
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
        const product = await Product.findById(req.params.id)
            .exec();
        res.render("products/show", { product: product });
    } catch {
        res.redirect("/");
    }
});


// delete Product route
router.delete("/:id", async (req, res) => {
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


async function renderFormPage(res, product, form, hasError = false) {
    try {
        const params = {
            product: product,
        };

        if (hasError) {
            if (form === "edit") {
                params.errorMessage = "Error Editing Book";
            } else {
                params.errorMessage = "Error Updating Book";
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





function saveCover(product, coverEncoded) {
    if (coverEncoded == null) return;
    const cover = JSON.parse(coverEncoded);
    if (cover != null && imageMimeTypes.includes(cover.type)) {
        product.coverImage = new Buffer.from(cover.data, "base64");
        product.coverImageType = cover.type;
    }
}

module.exports = router;





