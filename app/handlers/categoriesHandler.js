var Category = require("../models/category");

function create(req, res) {
  var category = new Category();
  category.name = req.body.category.name;
  category.description = req.body.category.description;
  category.save(function(err) {
    if(err) {
      var msg = err.code == 11000 ? 'A category with that name already exists' : err;
      return res.status(401).send({
        success: false,
        message: msg
      });
    }
    res.send(category);
  });
}

function update(req, res) {
  Category.findById(req.params.category_id, function(err, category) {
    if(err) return res.status(500).send(err);
    if(req.body.category.name) category.name = req.body.category.name;
    if(req.body.category.description) category.description = req.body.category.description;

    category.save(function(err) {
      if(err) return res.status(401).send(err);
      res.send(category);
    });
  });
}

function show(req, res) {
  Category.findById(req.params.category_id, function(err, category) {
    if(err) return res.status(401).send(err);
    res.send(category);
  });
}

function all(req, res) {
  Category.find(function(err, categories) {
    if(err) return res.status(500).send(err);
    res.send(categories);
  }).sort({ name: 'asc' });
}

function remove(req, res) {
  Category.remove({
    _id: req.params.category_id
  }, function(err, category) {
    if(err) return res.status(500).send(err);
    res.send({ message: "Category deleted" });
  });
}

exports.create = create;
exports.update = update;
exports.show = show;
exports.remove = remove;
exports.all = all;
