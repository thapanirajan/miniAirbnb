const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/student");

const studentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  class: {
    type: String,
    required: true,
  },

  faculty: {
    type: String,
    required: true,
  },

  address: {
    type: String,
    required: true,
  },
});

const studentModel = mongoose.model("student", studentSchema);

module.exports = studentModel;
