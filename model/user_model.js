const mongoose = require("mongoose");

const user_model = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add email abc@domain.com"],
    },
    password: {
      type: String,
      required: [true, "Please add password"],
    },
    name: {
        type: String,
        required: [true, "Please add name"],
      }
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("user_model", user_model, "user_model");
