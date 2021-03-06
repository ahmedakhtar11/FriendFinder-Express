// Required
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Express
var app = express();
var PORT = process.env.PORT || 3000;

// Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Routes
var htmlRoutes = require('./app/routing/htmlRoutes.js');
var apiRoutes = require('./app/routing/apiRoutes.js');
app.use('/', htmlRoutes);
app.use('/', apiRoutes);

// Listening
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});