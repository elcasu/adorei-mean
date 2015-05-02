var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  name: { type: String, required: true, index: { unique: true } },
  description: String
});

module.exports = mongoose.model('Category', categorySchema);
