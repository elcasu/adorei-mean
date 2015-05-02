var Product = require("../models/product");

function create(req, res) {
  var product = new Product();
  product.name = req.body.name;
  product.category = req.body.category_id;
  product.price = req.body.price;
  product.save(function(err) {
    if(err) return res.send(err);
    res.send(product);
  });
}

function update(req, res) {
  Product.findById(req.params.product_id, function(err, product) {
    if(err) return res.status(404).send(err);
    if(req.body.name) product.name = req.body.name;
    if(req.body.category_id) product.category = req.body.category_id;
    if(req.body.price) product.price = req.body.price;

    product.save(function(err) {
      if(err) return res.status(500).send(err);
      res.send(product);
    });
  });
}

function show(req, res) {
  Product.findOne({ _id: req.params.product_id })
  .populate('category').exec(function(err, product) {
    if(err) return res.status(500).send(err);
    res.send(product);
  });
}

function all(req, res) {
  Product.find().populate('category').exec(function(err, products) {
    if(err) return res.status(500).send(err);
    res.send(products);
  });
}

function remove(req, res) {
  Product.remove({
    _id: req.params.product_id
  }, function(err, product) {
    if(err) return res.status(500).send(err);
    res.send({ message: "Product deleted" });
  });
}

exports.create = create;
exports.update = update;
exports.show = show;
exports.remove = remove;
exports.all = all;
