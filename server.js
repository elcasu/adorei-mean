// Define packages
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var morgan = require("morgan");
var mongoose = require("mongoose");
var port = process.env.PORT || 8888;

// Models
var User = require('./app/models/user');

// Handle POST data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Handle CORS requests
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, content-type, Authorization');
  next();
});

// Set database connection
mongoose.connect('mongodb://localhost:27017/test-api');

// Log requests to console
app.use(morgan('dev'));

// Routes
app.get('/', function(req, res) {
  res.send('Bienvenido a la página principal! :-)');
});

var apiRouter = express.Router();

// Log requests
apiRouter.use(function(req, res, next) {
  console.log("Somebody arrived! :-)");
  next();
});

// ---------- API routes ---------- //
apiRouter.get('/', function(req, res) {
  res.json({
    message: "Super mensaje desde la api! :-)"
  });
});

// Users routes
apiRouter.route('/users')
  // Create user
  .post(function(req, res) {
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
  })

  // Get all users
  .get(function(req, res) {
    User.find(function(err, users) {
      if(err) {
        res.send(err);
      }
      res.json(users);
    });
  })
;

apiRouter.route('/users/:user_id')
  // Get specific user
  .get(function(req, res) {
    User.findById(req.params.user_id, function(err, user) {
      if(err) {
        res.send(err);
      }
      res.json(user);
    });
  })

  // Update user
  .put(function(req, res) {
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
  })

  // Delete user
  .delete(function(req, res) {
    User.remove({
      _id: req.params.user_id
    }, function(err, user) {
      if(err) return res.send(err);
      res.json({ message: "User deleted" });
    });
  })
  ;

app.use('/api', apiRouter);
app.listen(port);
console.log("Listening on port " + port + "...");