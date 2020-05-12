const path = require("path");
const router = require("express").Router();
const db = require("../models");


router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
    // res.redirect("https://fridgebook.herokuapp.com/")
});

// Retrieve user's data from database
router.get("/profile", (req, res) => {
    if (req.isAuthenticated()) {
        db.Foods.findAll({ where: { UserId: req.user.id } })
            .then(result => res.json({ user_name: req.user.name, ingredients: result }))
            .catch(err => res.status(422).json(err))
    }else{
        res.end();
    }
});

module.exports = router;