const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys.js");
const db = require("../models");
const Users = db.Users;


// passport serialize/deserialize user info
passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    /* TODO: Replace with mongodb*/
    Users.findOne({ where: { id: id } }).then((user) => {
        done(null, user);
    });

});

passport.use(
    // google strategy setup
    new GoogleStrategy({
        callbackURL: "/auth/google/redirect",
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret
    }, (accessToken, refreshToken, profile, done) => {
        Users.findOne({ where: { googleID: profile.id } }).then((currentUser) => {
            if (currentUser) {
                // user found
                console.log("user found!");
                done(null, currentUser.dataValues)
            } else {
                // user not found, create a new users in database
                Users.create({ name: profile.displayName, googleID: profile.id }).then(function (newUser) {
                    console.log("new user created!");
                    done(null, newUser.dataValues);
                });
            }
        });

    })
);