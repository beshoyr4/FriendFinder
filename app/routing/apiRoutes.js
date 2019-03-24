// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information 
// ===============================================================================

var friendData = require("../data/friends");

// ROUTING
// ===============================================================================
module.exports = function (app) {

  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------
  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // ---------------------------------------------------------------------------
  app.post("/api/friends", function (req, res) {

    //console.log(req.body)

    // Grab user data from post
    var userInput = req.body;
    var userScores = userInput.scores;

    // Calculate match
    var friendName = "";
    var friendImage = "";
    var totalDiff = 1000;

    // Loop through friendData from friends.js
    for (var i = 0; i < friendData.length; i++) {
      var diff = 0;

      // Loop through scores obtained from friends.js
      for (var j = 0; j < userScores.length; j++) {
        // returns the absolute value of difference between scores
        diff += Math.abs(friendData[i].scores[j] - userScores[j]);
      };

      if (diff < totalDiff) {
        totalDiff = diff;
        // Picks the right friend from friends.js
        friendName = friendData[i].name;
        friendImage = friendData[i].photo;
      };

    };

    // Adds new entry
    friendData.push(userInput);

    // Pushes information to front 
    res.json({ name: friendName, photo: friendImage });

  });

};
