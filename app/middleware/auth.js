var jwt = require("jsonwebtoken");
var config = require("../../config");
var user = require("../models/user");

// Handle authenticated routes
module.exports = function(req, res, next) {
  var token = req.headers['access-token'];
  if(token) {
    jwt.verify(token, config.secret, function(err, decoded) {
      if(err) {
        res.status(403).send({
          success: false,
          message: 'Invalid token'
        });
      }
      else {
        req.decoded = decoded;
        next();
      }
    });
  }
  else {
    res.status(403).send({
      success: false,
      message: 'No token provided'
    });
  }
};

