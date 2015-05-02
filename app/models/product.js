var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var Category = require("./category");

var productSchema = new Schema({
  name: String,
  image: String,
  price: Number,
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
