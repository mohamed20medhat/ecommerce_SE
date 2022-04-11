const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    coverImage: {
        type: Buffer,
        required: true,
    },
    coverImageType: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
    },
    count_of_ratings: {
        type: Number,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    reviews: {
        type: Array,
    },
});

productSchema.virtual("coverImagePath").get(function () {
    if (this.coverImage != null && this.coverImageType != null) {
        return `data:${
            this.coverImageType
        };charset=utf-8;base64,${this.coverImage.toString("base64")}`;
    }
});

module.exports = mongoose.model("Product", productSchema);
