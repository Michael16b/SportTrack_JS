var express = require('express');
var router = express.Router();
var user_dao = require('sport-track-db').user_dao;
var User = require('sport-track-db').user;

/* Connect User */
router.post('/', function(req, res, next) {
    var user = user_dao.selectUser(req.body.email, req.body.password, function(err, user) {
        if (err) {
            res.status(500).send(err);
        } else {
            if (user == null) {
                res.status(404).send("User not found");
            } else {

            }
        }
    });
});