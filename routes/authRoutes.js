require('dotenv').config();
const router = require("express").Router();
const passport = require("passport");


/* google log in*/
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&& AUTHROUTES:")
    console.log(process.env.PRODUCTION)
    // res.redirect(process.env.PRODUCTION ? "/" : "http://localhost:3000/");
    res.redirect("https://fridgebook.herokuapp.com/dashboard/")
});


/* log out */
router.get("/logout", (req, res) => {
    req.logOut();
    // res.redirect(process.env.PRODUCTION ? "/" : "http://localhost:3000/");
    res.redirect("https://fridgebook.herokuapp.com/dashboard/")
});

module.exports = router;