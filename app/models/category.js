var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Product = require("./product.js");

var categorySchema = new Schema({
  name: { type: String, required: true, index: { unique: true } },
  description: String,
  products: [{
    type: Schema.Types.ObjectId,
    ref: 'Product'
  }],
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Category', categorySchema);
