var db = require('./sqlite_connection');

userDAO = function() {
    this.insert = function(values) {
        let query = "insert into User(lName,fName,birthDate,gender,size, weight, eMail, password) values (?,?,?,?,?,?,?,?)";
        db.run(query, values, (err) => {
            if (err) {
                console.log(err);
            }
        });
    };
    this.update = function(key, values) {
        let query = "update User set lName = $lName , fName = $fName, birthDate = $birthDate, gender = $gender, size = $size, weight = $weight, eMail= $eMail, password = $password  WHERE eMail = $key";
        db.run(query, key, values);

    };
    this.delete = function(key, callback) {
        let query = "delete from User where idUser = ?";
        db.run(query, key, callback);
    };
    this.findAll = function(callback) {
        let query = "SELECT * FROM User ORDER BY id";
        let result = [];

        db.all(query, [], (err, rows) => {
            if (err) {
                throw err;
            }
            rows.forEach((row) => {
                result.push(row);
            });
            callback(result);
        });
    };
    this.findByKey = function(key, callback) {
        let query = "SELECT * FROM User WHERE idUser = ?";
        db.run(query, [key], callback);
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