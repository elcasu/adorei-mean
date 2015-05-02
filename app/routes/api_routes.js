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
  apiRouter.get('/users/:user_id', handlers.usersHandler.show);
  apiRouter.put('/users/:user_id', handlers.usersHandler.update);
  apiRouter.delete('/users/:user_id', handlers.usersHandler.remove);
  apiRouter.get('/me', handlers.usersHandler.me);

  // Categories
  apiRouter.get('/categories', handlers.categoriesHandler.all);
  apiRouter.post('/categories', handlers.categoriesHandler.create);
  apiRouter.get('/categories/:category_id', handlers.categoriesHandler.show);
  apiRouter.put('/categories/:category_id', handlers.categoriesHandler.update);
  apiRouter.delete('/categories/:category_id', handlers.categoriesHandler.remove);

  // Products
  apiRouter.get('/products', handlers.productsHandler.all);
  apiRouter.post('/products', handlers.productsHandler.create);
  apiRouter.get('/products/:product_id', handlers.productsHandler.show);
  apiRouter.put('/products/:product_id', handlers.productsHandler.update);
  apiRouter.delete('/products/:product_id', handlers.productsHandler.remove);

  return apiRouter;
}
