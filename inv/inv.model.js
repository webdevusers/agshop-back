const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const invSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item"
  }],
});

module.exports = model('Inventory', invSchema);
