var express = require('express');
var router = express.Router();
var user_dao = require('sport-track-db').user_dao;
var User = require('sport-track-db').user;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('users', { title: 'Users' });
});

/* Add a new user */
router.post('/', function(req, res, next) {
    console.log(req.body);

});


module.exports = router;