var express = require("express");
const User = require('../sport-track-db/User');
var router = express.Router();
var user_dao = require('../sport-track-db/user_dao');

//afficher tous les users de la bdd
router.get("/", function(req, res, next) {
    res.render("users", { title: "S'inscrire" });
});

router.post("/", function(req, res, next) {
    try {
        var email = req.body.mail;
        console.log(email);
        user_dao.findByEmail(email).then((rows) => {
            if (rows && Object.values(rows)) {
                res.render('error', { message: "L'email existe déjà", error: { status: 500, stack: "L'email existe déjà" } });
            } else {
                var user = new User();
                user.init(req.body.surname, req.body.name, req.body.birth, req.body.gender,
                    parseInt(req.body.size), parseInt(req.body.weight), email, password);
                user_dao.insert(user);
                res.render('user_add_valid');
            }
        });
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;