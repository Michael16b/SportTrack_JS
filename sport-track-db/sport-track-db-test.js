var db = require('./sqlite_connection');
var userDAO = require('./user_dao')


userDAO.deleteAll();
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


userDAO.insert(user);
console.log("User inserted");




user2 = {
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



userDAO.update(user2);
console.log("User updated");


console.log("Test find all");
userDAO.findAll(console.log);


console.log("Test deleteUser");
userDAO.delete(user.eMail);
console.log("User deleted");


userDAO.deleteAll();




console.log("Test find by key");
userDAO.findByKey(user2.eMail, console.log);