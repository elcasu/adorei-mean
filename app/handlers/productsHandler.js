var Product = require("../models/product");

function create(req, res) {
  var product = new Product();
  product.name = req.body.product.name;
  product.category = req.body.product.category_id;
  product.price = req.body.product.price;
  product.save(function(err) {
    if(err) return res.send(err);
    res.send(product);
  });
}

function update(req, res) {
  Product.findById(req.params.product_id, function(err, product) {
    if(err) return res.status(500).send(err);
    if(!product) {
      return res.status(404).send({ message: "Product not found" });
    }
    if(req.body.product.name) product.name = req.body.product.name;
    if(req.body.product.category_id) product.category = req.body.product.category_id;
    if(req.body.product.price) product.price = req.body.product.price;

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
  Product.find().populate('category').sort({ name: 'asc' }).exec(function(err, products) {
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

