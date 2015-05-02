module.exports = {
  port: process.env.PORT || 8888,
  secret: "7f7256e4f258f755473291bb7cb67c54",
  database: {
    development: "mongodb://localhost:27017/test-api"
  }
};
