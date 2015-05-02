var express = require("express");
var token_authentication = require("../middleware/auth");

module.exports = function(handlers) {
  var apiRouter = express.Router();

  // Authentication (public resource)
  apiRouter.post('/authenticate', handlers.usersHandler.authenticate);

  // From here we'll have authenticated routes
  apiRouter.use(token_authentication);

  // Users
  apiRouter.get('/users', handlers.usersHandler.all);
  apiRouter.post('/users', handlers.usersHandler.create);
  apiRouter.get('/me', handlers.usersHandler.me);
  apiRouter.get('/users/:user_id', handlers.usersHandler.show);
  apiRouter.put('/users/:user_id', handlers.usersHandler.update);
  apiRouter.delete('/users/:user_id', handlers.usersHandler.remove);

  return apiRouter;
}
