const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  text: {
    type: String
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
