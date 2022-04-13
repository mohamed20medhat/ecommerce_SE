const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    name: String,
    password: String,
    cart: Array,
  },
  { collection: "users" }
);

module.exports = mongoose.model("User", userSchema);
