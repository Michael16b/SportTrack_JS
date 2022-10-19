var db = require('./sqlite_connection');

activityEntryDAO = function() {
    this.insert = function(data, callback) {
        let query = "insert into Data(startTime, longitude, latitude,altitude, idAct) values ($startT,$long,$lat,$alt,$idAct)";
        values = [data.getStartTime(), data.getLongitude(), data.getLatitude(), data.getAltitude(), data.getIdAct()];
        db.run(query, values, callback);
    };

    this.selectData = function(data, callback) {
        let query = "select * from Data where idAct = $idAct and startTime = $startT and longitude = $long and latitude = $lat and altitude = $alt";
        values = [data.getIdAct(), data.getStartTime(), data.getLongitude(), data.getLatitude(), data.getAltitude()];
        db.get(query, values, callback);
    }
    this.update = function(data) {
        let query = "update Data set startTime = $startT, longitude = $long, latitude = $lat, altitude = $alt, idAct = $idAct WHERE idData = $id";
        values = [data.getStartTime(), data.getLongitude(), data.getLatitude(), data.getAltitude(), data.getIdAct(), data.getIdData()];
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
        db.get(query, values, callback);
    };

    this.deleteAll = function(callback) {
        let query = "delete from Data";
        db.run(query, callback);
    };
};
var dao = new activityEntryDAO();
module.exports = dao;