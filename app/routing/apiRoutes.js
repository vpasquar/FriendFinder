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
        var diffList = [];
        console.log(thisUser);
        if (friendData.length > 1) {
        	for (var i=0; i < friendData.length;i++) {
        		var difference = 0;
                console.log(thisUser);
        		for (var x = 0; x < thisUser.scores.length; x++) {
        			var fileAns = friendData[i].answers[x];
        			var userAns = thisUser.scores[x];
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