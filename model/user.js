const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//how to store an array in mongodb
//! later come for the array for cart
//! later come for the array for previous bought items 
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model("user", userSchema);
