const mongoose = require("mongoose");

const sessions = mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Please add email abc@domain.com"],
    },
    date: {
      type: String,
      required: [true, "Please add date"],
    },
    ip: {
      type: String,
      required: [true, "Please add IP"],
    },
    start: {
      type: String,
      required: [true, "Please add start time"],
    },
    end: {
      type: String,
      required: [true, "Please add end time"],
    },
    location: {
      type: String,
      required: [true, "Please add time"],
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("sessions", sessions, "sessions");
