var express = require("express");
const User = require('../sport-track-db/User');
var router = express.Router();
var user_dao = require('../sport-track-db/user_dao');


router.get("/", function(req, res, next) {
    if (req.session.idUser != null) {
        user_dao.findByKey(req.session.idUser, (err, row) => {
            if (err) {
                console.log(err);
            } else if (row != null) {
                var information = new Array();
                var data = [row.lName, row.fName, row.birthDate, row.gender, row.size, row.weight, row.email, row.password];
                information.push(data);
                res.render('user_update_form', { title: 'Modifier mes informations', info: information[0] });
            }
        });
    } else {
        res.render("users", { title: "S'inscrire" });
    }
});

router.post("/", function(req, res, next) {
    try {
        var email = req.body.mail;
        var password = req.body.password;
        user_dao.findByEmail(email, (err, row) => {
            if (err) {
                console.log(err);
            } else if (row != null && row.idUser != req.session.idUser) {
                res.render("users", { title: "S'inscrire", message: "Email déjà utilisé" });
            } else {
                var user = new User();
                user.init(req.body.surname, req.body.name, req.body.birth, req.body.gender,
                    parseInt(req.body.size), parseInt(req.body.weight), email, password);
                user_dao.update(user, req.session.idUser, (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        res.render('user_update_valid');
                    }
                });
            }
        });
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;