const mongoose = require("mongoose");

const working = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add email abc@domain.com"],
    },
    date: {
      type: String,
      required: [true, "Please add date"],
    },

    office_time: {
      type: String,
      required: [false, "Please add office time"],
    },
    virtual_time: {
      type: String,
      required: [false, "Please add virtual time"],
    },
    
    attendance: {
      type: String,
      required: [true, "Please add attendance"],
    },
    
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("working", working, "working");
