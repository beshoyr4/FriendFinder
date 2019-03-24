// Create a basic server using Express.JS
// Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
// Middleware 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("app/public"));

// API and HTML routes
// Has to go below the Middleware
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function () {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
});