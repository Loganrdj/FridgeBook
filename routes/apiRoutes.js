const router = require("express").Router();
const db = require("../models");

/**
 * route = /api/ingredent
 */
router.route("/ingredient")
    // get all the ingredient of the current user
    .get((req, res) => {
        if (req.user) {
            db.Foods.findAll({ where: { UserId: req.user.id } })
                .then(result => res.send(result))
                .catch(err => res.status(422).json(err));
        }
    })
    // add a ingredient to the current user's database
    .post((req, res) => {
        let ingredient = req.body;
        if (req.user) {
            if (ingredient.name && ingredient.quantity && ingredient.date_start && ingredient.date_expire) { // ingredient data validation
                ingredient.UserId = req.user.id;
                db.Foods.create(ingredient)
                    .then(result => res.send(result))
                    .catch(err => res.status(422).json(err));
            }else{
                res.status(422).end();
            }
        } else {
            res.status(401).end();
        }
    })


/**
 * route = /api/ingredent/:id
 */
router.route("/ingredient/:id")
    // get a specific ingredient
    .get((req, res) => {
        if (req.user) {
            db.Foods.findOne({ where: { UserId: req.user.id, id: req.params.id } })
                .then(result => res.send(result))
                .catch(err => res.status(422).json(err));
        }
    })
    // update a specific ingredient
    .put((req, res) => {
        if (req.user) {
            if(req.body.quantity > 0) {
                db.Foods.findOne({ where: { UserId: req.user.id, id: req.params.id } })
                    .then(result => {
                        console.log(result)
                        let tempQuantity = result.quantity
                        if(result.quantity > req.body.quantity){
                            db.Foods.update({quantity: tempQuantity - req.body.quantity}, { where: { UserId: req.user.id, id: req.params.id } })
                            .then(result => res.json(result))
                            .catch(err => res.status(422).json(err));
                        } else {
                            db.Foods.destroy({ where: { UserId: req.user.id, id: req.params.id } })
                            .then(result => res.json(result))
                            .catch(err => res.status(422).json(err));
                        }
                        
                    })
                
            }else{
                res.status(422).end();
            }
        } else {
            res.status(401).end();
        }
    })
    // remove a specific ingredient
    .delete((req, res) => {
        if (req.user) {
            db.Foods.destroy({ where: { UserId: req.user.id, id: req.params.id } })
                .then(result => res.json(result))
                .catch(err => res.status(422).json(err));
        }else {
            res.status(401).end();
        }
    })

module.exports = router;