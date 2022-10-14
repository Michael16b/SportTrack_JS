var db = require('./sqlite_connection');
var User = require('./User');

userDAO = function() {
    this.insert = function(user, callback) {
        let query = "insert into User(lName,fName,birthDate,gender,size, weight, eMail, password) values ($lName,$fName,$birthDate,$gender,$size,$weight,$eMail,$password)";
        values = [user.getlName(), user.getfName(), user.getBirthDate(), user.getGender(), user.getSize(), user.getWeight(), user.getMail(), user.getPassword()];
        db.run(query, values, callback);
    };

    this.selectUser = function(user, callback) {
        let query = "SELECT * FROM User WHERE eMail = $eMail AND password = $password";
        values = [user.getMail(), user.getPassword()];
        db.get(query, values, callback);
    }

    this.update = function(user, key, callback) {
        let query = "update User set lName = $lName , fName = $fName, birthDate = $birthDate, gender = $gender, size = $size, eMail = $eMail, weight = $weight, password = $password  WHERE idUser =" + key;
        values = [user.getlName(), user.getfName(), user.getBirthDate(), user.getGender(), user.getSize(), user.getMail(), user.getWeight(), user.getPassword()];
        db.run(query, values, callback);

    };
    this.delete = function(values, callback) {
        let query = "delete from User where idUser = ?";
        db.run(query, values, callback);
    };
    this.findAll = function(callback) {
        let query = "SELECT * FROM User";
        db.all(query, [], callback);
    };

    this.findByKey = function(values, callback) {
        let query = "SELECT * FROM User WHERE idUser = ?";
        db.get(query, values, callback);
    };
    this.deleteAll = function(callback) {
        let query = "delete from User";
        db.run(query, callback);
    };
};
var dao = new userDAO();
module.exports = dao;