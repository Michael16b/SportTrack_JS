var express = require('express');
var router = express.Router();
var user_dao = require('sport-track-db').user_dao;
var User = require('sport-track-db').user;


/* Add a new user */
router.post('/', function(req, res, next) {
    var user = new User();
    user.init(req.body.surname, req.body.name, req.body.date, req.body.gender, req.body.size, req.body.weight, req.body.email, req.body.password);
    user_dao.addUser(user, function(err, user) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.render('index', { title: 'Express' });
        }
    });
});
module.exports = router;