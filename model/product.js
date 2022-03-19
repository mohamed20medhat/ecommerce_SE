const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//how to store an array in mongodb
//! later come for the array of comments
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    src: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    tag: {
        type: String,
        required: true,
    },
    ratings: {
        type: Number,
    },
});

module.exports = mongoose.model("product", productSchema);
