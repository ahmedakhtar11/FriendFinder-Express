var express = require("express");
var path = require("path");
var router = express.Router();
var friendsList = require('../data/friends.js');

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

router.post('/api/friends', function(req, res) {
    var survey = req.body;
    var friendChosen;
    var friendMatch = [];
    for (var i = 0; i < friendsList.length; i++) {
        var totalDifference = 0;
        for (var k = 0; k < 10; k++) {
            var scoreDiff = Math.abs(friendsList[i].scores[k] - survey.scores[k]);
            totalDifference += scoreDiff;
        }
        friendMatch.push({
            name: friendsList[i].name,
            picture: friendsList[i].picture,
            totalDiff: totalDifference
        });
    }
    var maxScore = 40;
    friendMatch.map(function(obj) {
        if (obj.totalDiff < maxScore) maxScore = obj.totalDiff;
    });
    friendChosen = friendMatch.filter(function(e) { return e.totalDiff == maxScore; });

    res.json(friendChosen);
    friendsList.push(survey);

});

router.get('/api/friends', function(req, res) {
    res.json(friendsList);
});

module.exports = router;