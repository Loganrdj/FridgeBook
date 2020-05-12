require('dotenv').config();
const express = require("express");
const router = require("./routes");
const path = require('path');
// load databse
var db = require("./models");

// load auth config
const passportSetup = require("./config/passport-config.js");
const myKeys = require("./config/keys.js");
const passport = require("passport");

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var session = require("express-session"),
  bodyParser = require("body-parser");

console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& SERVER:")
console.log(process.env.PRODUCTION)
app.use(express.static("client/public"));
app.use(session({ secret: myKeys.cookieSession.sessioinKey })); //cookie: { maxAge: 0.5 * 60 * 60 * 1000 } }
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(router);                                   //"backend routing/api call"


var syncOptions = { force: false };
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(`Server now running on PORT ${PORT}.`);
  })
});
