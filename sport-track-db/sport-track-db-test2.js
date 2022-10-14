var User = require('./User');
var user_dao = require('./sport-track-db').user_dao;
var Activity = require('./Activity');
var activity_DAO = require('./sport-track-db').activityDAO;

var db = require('./sport-track-db').db_connection;




user_dao.deleteAll(function(err) {
    if (err) {
        console.log(err);
    }
});

console.log("All users deleted");


console.log("TEST : UserDAO");

var user = new User();
var user2 = new User();
user.init("Doe", "John", "1990-01-01", "M", 180, 80, "john.eMail@gmail.com", "123456");
user2.init("Besily", "Michaël", "2003-10-01", "M", 180, 80, "Michael.besily@gmail.com", "123456");

user_dao.insert(user, (err) => {
    if (err) {
        console.log(err);
    }
});


user_dao.selectUser(user, (err, row) => {
    if (err) {
        console.log(err);
    }
    var idUser = row.idUser
    console.log("User inserted with id : " + idUser);
    console.log("Test : findByKey ")
    user_dao.findByKey(idUser, (err, row) => {
        if (err) {
            console.log(err);
        }
        console.log(row);
    })
    console.log("Test : update ")
    user_dao.update(user2, idUser, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("User updated");

    })
});