var db = require('./sqlite_connection');
var userDAO = require('./user_dao')


userDAO.deleteAll();
console.log("All users deleted");

let user = {
    lName: "Doe",
    fName: "John",
    birthDate: "1990-01-01",
    gender: "M",
    size: 180,
    weight: 80,
    eMail: "john.eMail@gmail.com",
    password: "123456"
};


userDAO.insert([user.lName, user.fName, user.birthDate, user.gender, user.size, user.weight, user.eMail, user.password]);
console.log("User inserted");

user = {
    lName: "BESILY",
    fName: "Michaël",
    birthDate: "1990-01-01",
    gender: "M",
    size: 170,
    weight: 70,
    eMail: "michael.besily@gmail.com",
    password: "123456"
};


userDAO.update("john.eMail@gmail.com", [user.lName, user.fName, user.birthDate, user.gender, user.size, user.weight, user.eMail, user.password], );
console.log("User updated");