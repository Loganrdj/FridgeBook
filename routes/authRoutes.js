const router = require("express").Router();
const passport = require("passport");


/* google log in*/
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
    res.redirect(process.env.PRODUCTION ? "/" : "http://localhost:3000/");
});


/* log out */
router.get("/logout", (req, res) => {
    req.logOut();
    res.redirect(process.env.PRODUCTION ? "/" : "http://localhost:3000/");
});

module.exports = router;