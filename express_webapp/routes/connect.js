var express = require("express");
var user_dao = require("../sport-track-db/sport-track-db").user_dao;
var router = express.Router();

router.get("/", function(req, res) {
    res.render("connect", { title: "Connexion" });
});

router.post("/", function(req, res, next) {
    try {
        var email = req.body.mail;
        var password = req.body.password;
        user_dao.connect(email, password, (err, row) => {
            if (err) {
                console.log(err);
            } else if (row != null) {
                req.session.idUser = row.idUser;
                res.redirect("/");
            } else {
                res.render("errorAccount", { title: "Connexion", message: "Email ou mot de passe incorrect" });
            }
        });

    } catch (error) {
        console.error(error);
    }
});

router.get("/disconnect", function(req, res) {
    req.session.destroy();
    res.redirect("/");
});

module.exports = router;