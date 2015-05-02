var express = require("express");
var auth = require("../middleware/auth");

module.exports = function(handlers) {
  var publicRouter = express.Router();

  publicRouter.post('/authenticate', handlers.usersHandler.authenticate);

  publicRouter.get('/', handlers.staticHandler.main);

  return publicRouter;
}
