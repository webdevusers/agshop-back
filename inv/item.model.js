const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const itemSchema = new Schema({
  title: String,
  images: Array,
  price: Number,
  oldPrice: Number,
  variations: Array,
  desc: String,
  chars: Object,
  reviews: Array
});

module.exports = model('Item', itemSchema)