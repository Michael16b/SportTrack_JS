var user_dao = require('./sport-track-db').user_dao;
var activity_DAO = require('./sport-track-db').activityDAO;
var db = require('./sport-track-db').db_connection;



console.log("TEST : UserDAO");


user_dao.deleteAll();
console.log("All users deleted");

var user = {
    $lName: "Doe",
    $fName: "John",
    $birthDate: "1990-01-01",
    $gender: "M",
    $size: 180,
    $weight: 80,
    $eMail: "john.eMail@gmail.com",
    $password: "123456"
};


user_dao.insert(user);
console.log("User inserted");




var user2 = {
    $lName: "BESILY",
    $fName: "Michaël",
    $birthDate: "1990-01-01",
    $gender: "M",
    $size: 170,
    $weight: 70,
    $eMail: "michael.besily@gmail.com",
    $password: "123456",
    $lastMail: "john.eMail@gmail.com"
};



user_dao.update(user2);
console.log("User updated");


console.log("Test find all");
user_dao.findAll(console.log);


console.log("Test deleteUser");
user_dao.delete(user.$eMail);
console.log("User deleted");


user_dao.deleteAll();




console.log("Test find by key");
user_dao.findByKey(user2.$eMail);



console.log("TEST : Activities");

activity_DAO.deleteAll();





var activity = {
    $desc: "Basket-Ball",
    $date: "18/08/2022",
    $st: "16:00:00",
    $du: "00:10:00",
    $dis: 10,
    $cFreqMin: 75,
    $cFreqAvg: 110,
    $cFreqMax: 150,
    $idUser: 0
};



console.log("Test add activity");
activity_DAO.insert(activity);
console.log("Activity inserted");


console.log("Test find all");
activity_DAO.findAll(console.log);



var activity = {
    $desc: "FootBall",
    $date: "20/08/2022",
    $st: "18:00:00",
    $du: "00:10:00",
    $dis: 10,
    $cFreqMin: 75,
    $cFreqAvg: 108,
    $cFreqMax: 115,
    $idUser: 0
};


console.log("Test update activity");
activity_DAO.update(activity);
console.log("Update activity done");

console.log("Test delete activity");
activity_DAO.delete(activity.$idUser);