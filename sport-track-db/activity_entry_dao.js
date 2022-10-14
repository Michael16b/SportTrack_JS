var db = require('./sqlite_connection');

activityEntryDAO = function() {
    this.insert = function(values) {
        let query = "insert into Data(startTime, longitude, latitude,altitude, idAct) values ($startT,$long,$lat,$alt,$idAct)";
        db.run(query, values, (err) => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.update = function(values) {
        let query = "update Data set startTime = $startT, longitude = $long, latitude = $lat, altitude = $alt, idAct = $idAct WHERE idData = $id";
        db.run(query, values);

    };
    this.delete = function(key) {
        let query = "delete from Data where idData = ?";
        db.run(query, key);
    };
    this.findAll = function(callback) {
        let query = "SELECT * FROM Data";
        db.all(query, [], callback);
    };

    this.findByKey = function(values, callback) {
        let query = "SELECT * FROM Data WHERE idData = ?";
        db.run(query, values, callback);
    };
    this.deleteAll = function() {
        let query = "delete from Data";
        db.run(query, (err) => {
            if (err) {
                console.log(err);
            }
        });
    };
};
var dao = new activityEntryDAO();
module.exports = dao;