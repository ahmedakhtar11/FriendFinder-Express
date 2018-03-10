var express = require("express");
var path = require("path");
var router = express.Router();

//Display Time
router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// Defining Home Page Route
router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/home.html"));
    console.log(__dirname);

});

// Defining Survey Route
router.get('/survey', function(req, res) {
    res.sendFile(path.join(__dirname, "/../public/survey.html"));
});

module.exports = router;