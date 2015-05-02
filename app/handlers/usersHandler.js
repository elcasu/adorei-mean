var jwt = require("jsonwebtoken");
var config = require("../../config");
var User = require("../models/user");

function authenticate(req, res) {
  User.findOne({
    username: req.body.username
  })
  .select("name username password")
  .exec(function(err, user) {
    if(err) throw err;
    if(!user) {
      res.status(403);
      res.json({
        success: false,
        message: 'Authentication failed'
      });
    }
    else {
      if(!user.comparePassword(req.body.password)) {
        res.status(403);
        res.json({
          success: false,
          message: 'Authentication failed'
        });
      }
      else {
        var token = jwt.sign({
          name: user.name,
          username: user.username
        }, config.secret, {
          expiresInMinutes: 1440 // expires in 24 hs
        });
        res.json({
          success: true,
          token: token
        });
      }
    }
  });
}

function create(req, res) {
  var user = new User();
  user.name = req.body.name;
  user.username = req.body.username;
  user.password = req.body.password;
  user.save(function(err) {
    if(err) {
      if(err.code == 11000) {
        console.log("error 11000");
        return res.json({
          success: false,
          message: 'User already exists'
        });
      }
    }
    else {
      return res.send(err);
    }
    res.json({ message: 'User created successfully' });
  });
}

function update(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if(err) res.send(err);
    if(req.body.name) user.name = req.body.name;
    if(req.body.username) user.name = req.body.username;
    if(req.body.password) user.password = req.body.password;

    user.save(function(save_error) {
      if(save_error) res.send(save_error);
      res.json(user);
    });
  });
}

function show(req, res) {
  User.findById(req.params.user_id, function(err, user) {
    if(err) {
      res.send(err);
    }
    res.json(user);
  });
}

function all(req, res) {
  User.find(function(err, users) {
    if(err) {
      res.send(err);
    }
    res.json(users);
  });
}

function remove(req, res) {
  User.remove({
    _id: req.params.user_id
  }, function(err, user) {
    if(err) return res.send(err);
    res.json({ message: "User deleted" });
  });
}

function me(req, res) {
  res.send(req.decoded);
}

exports.authenticate = authenticate;
exports.create = create;
exports.update = update;
exports.show = show;
exports.all = all;
exports.remove = remove;
exports.me = me;
