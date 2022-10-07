var db = require('./sqlite_connection');

var UserDAO = function() {
    this.insert = function(values, callback) {
        let query = "insert into User(lName,fName,birthDate,gender,size, weight, eMail, password) values (?,?,?,?,?,?,?,?)";
        db.run(query, [values], (err, rows) => {
            if (err) throw err;
            callback(rows);
        });
    };
    this.update = function(key, values, callback) {
        let query = "update User set lName = ? , fName = ?, birthDate = ?, gender = ?, size = ?, weight = ?, eMail= ?, password = ?  WHERE eMail = ?";
        db.run(query, [values], callback);

    };
    this.delete = function(key, callback) {
        let query = "delete from User where idUser = ?";
        db.run(query, [key], callback);
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
};
var dao = new UserDAO();
module.exports = dao;