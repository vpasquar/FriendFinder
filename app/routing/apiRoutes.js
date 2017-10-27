// Import friend data.
var friendData = require('../data/friends.js');

module.exports = function(app) {

    // GET route for /api/friends returns friendData.
    app.get('/api/friends', function(req, res) {
        res.json(friendData);
    });

    // POST route for /api/friends takes in the new data and responds with the most compatible match.
    app.post('/api/friends', function(req, res) {
        // Our user is the data sent in the request.
        var thisUser = req.body;
        console.log(thisUser);
        var tempScores = [];
        // workaround for arrays not working in request ( i know this is stupid)
        tempScores.push(thisUser.score1);
        tempScores.push(thisUser.score2);
        tempScores.push(thisUser.score3);
        tempScores.push(thisUser.score4);
        tempScores.push(thisUser.score5);
        tempScores.push(thisUser.score6);
        tempScores.push(thisUser.score7);
        tempScores.push(thisUser.score8);
        tempScores.push(thisUser.score9);
        tempScores.push(thisUser.score10);
        var diffList = [];
        console.log(tempScores);
   
        if (friendData.length > 1) {
        	for (var i=0; i < friendData.length;i++) {
        		var difference = 0;
                console.log(thisUser);
        		for (var x = 0; x < tempScores.length; x++) {
        			var fileAns = friendData[i].answers[x];
        			var userAns = tempScores[x];
        			var diff    = fileAns - userAns
        			difference += Math.abs(diff);
        		}

                diffList.push(difference);
        	}

        	var minDiff = Math.min.apply(null,diffList);
        	var bestMatch = [];

        	for (var z=0; z < diffList.length; z++) {
        		if (diffList[z] === minDiff) {
                    bestMatch.push(friendData[z]);
        		}
        	}

        res.json(bestMatch[0]);

        } else {
        	res.json(friendData);
        }
        
        friendData.push(thisUser);
    });
};