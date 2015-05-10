// Define packages
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var jwt = require("jsonwebtoken");
var config = require("./config");
var multer = require("multer");

// Define application handlers
var handlers = {
  usersHandler: require("./app/handlers/usersHandler"),
  productsHandler: require("./app/handlers/productsHandler"),
  categoriesHandler: require("./app/handlers/categoriesHandler"),
  staticHandler: require("./app/handlers/staticHandler"),
  uploadsHandler: require("./app/handlers/uploadsHandler")
};

// Handle requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle CORS requests
app.use(require("./app/middleware/cors"));

// Handle multipart/form-data requests
app.use(multer({
  dest: './uploads/'
}));

// Set database connection
mongoose.connect(config.database.development);

// Set static content path
app.use(express.static(__dirname + "/public"));

// Log requests to console
app.use(morgan('dev'));

// Routes
app.use('/api', require("./app/routes/api_routes")(handlers));

app.listen(config.port);
console.log("Listening on port " + config.port + "...");
