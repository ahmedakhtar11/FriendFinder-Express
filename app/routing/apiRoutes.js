var express = require("express");
var path = require("path");
var router = express.Router();
var friendsList = require('../data/friends.js');

router.post('/api/friends', function(req, res) {
    var survey = req.body;
    var friendChosen;
    var friendMatch = [];
    for (var i = 0; i < friendsList.length; i++) {
        var difference = 0;
        for (var k = 0; k < 10; k++) {
            var scoreRange = Math.abs(friendsList[i].scores[k] - survey.scores[k]);
            difference += scoreRange;
        }
        friendMatch.push({
            name: friendsList[i].name,
            picture: friendsList[i].picture,
            range: difference
        });
    }
    
    var maxScore = 40;
    friendMatch.map(function(obj) {
        if (obj.range < maxScore) maxScore = obj.range;
    });
    friendChosen = friendMatch.filter(function(e) { return e.range == maxScore; });

    res.json(friendChosen);
    friendsList.push(survey);

});

router.get('/api/friends', function(req, res) {
    res.json(friendsList);
});

module.exports = router;