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
                user_dao.delete(row.idUser);
                req.session.destroy();
                res.render('user_delete_valid');
            }
        });
    } else {
        res.render("users", { title: "S'inscrire" });
    }
});


module.exports = router;