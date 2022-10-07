var db = require('./sqlite_connection');

userDAO = function() {
    this.insert = function(values) {
        let query = "insert into User(lName,fName,birthDate,gender,size, weight, eMail, password) values ($lName,$fName,$birthDate,$gender,$size,$weight,$eMail,$password)";
        db.run(query, values, (err) => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.update = function(values) {
        let query = "update User set lName = $lName , fName = $fName, birthDate = $birthDate, gender = $gender, size = $size, eMail = $eMail, weight = $weight, password = $password  WHERE eMail = $lastMail";
        db.run(query, values);

    };
    this.delete = function(key) {
        let query = "delete from User where eMail = ?";
        db.run(query, key);
    };
    this.findAll = function(callback) {
        let query = "SELECT * FROM User";
        db.all(query, [], callback);
    };

    this.findByKey = function(values, callback) {
        let query = "SELECT * FROM User WHERE eMail = ?";
        db.run(query, values, callback);
    };
    this.deleteAll = function() {
        let query = "delete from User";
        db.run(query, (err) => {
            if (err) {
                console.log(err);
            }
        });
    };
};
var dao = new userDAO();
module.exports = dao;