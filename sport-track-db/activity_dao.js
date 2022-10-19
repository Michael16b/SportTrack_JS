var db = require('./sqlite_connection');

activityDAO = function() {
    this.insert = function(activity, callback) {
        let query = "insert into Activities(description,date,startTime,duration,distance,cardiacFreqMin,cardiacFreqAvg, cardiacFreqMax,idUser) values ($desc,$date,$st,$du,$dis,$cFreqMin,$cFreqAvg,$cFreqMax,$idUser)";
        values = [activity.getDesc(), activity.getDate(), activity.getStartTime(), activity.getDuration(), activity.getDistance(), activity.getCardiacFreqMin(), activity.getCardiacFreqAvg(), activity.getCardiacFreqMax(), activity.getIdUser()];
        db.run(query, values, callback);
    };

    this.selectActivity = function(activity, callback) {
        let query = "select * from Activities where idUser = $idUser and description = $desc and date = $date and startTime = $st and duration = $du and distance = $dis and cardiacFreqMin = $cFreqMin and cardiacFreqAvg = $cFreqAvg and cardiacFreqMax = $cFreqMax ";
        values = [activity.getIdUser(), activity.getDesc(), activity.getDate(), activity.getStartTime(), activity.getDuration(), activity.getDistance(), activity.getCardiacFreqMin(), activity.getCardiacFreqAvg(), activity.getCardiacFreqMax()];
        db.get(query, values, callback);
    }

    this.update = function(activity, key, callback) {
        let query = "update Activities set description = $desc , date = $date,startTime = $st,duration = $du ,distance = $dis,cardiacFreqMin = $cFreqMin, cardiacFreqAvg = $cFreqAvg, cardiacFreqMax = $cFreqMax, idUser = $idUser WHERE idAct =" + key;
        values = [activity.getDesc(), activity.getDate(), activity.getStartTime(), activity.getDuration(), activity.getDistance(), activity.getCardiacFreqMin(), activity.getCardiacFreqAvg(), activity.getCardiacFreqMax(), activity.getIdUser()];
        db.run(query, values, callback);

    };
    this.delete = function(values, callback) {
        let query = "delete from Activities where idAct = ?";
        db.run(query, values, callback);
    };
    this.findAll = function(callback) {
        let query = "SELECT * FROM Activities";
        db.all(query, [], callback);
    };

    this.findByKey = function(values, callback) {
        let query = "SELECT * FROM Activities WHERE idAct = ?";
        db.get(query, values, callback);
    };
    this.deleteAll = function(callback) {
        let query = "delete from Activities";
        db.run(query, callback);
    };
};
var dao = new activityDAO();
module.exports = dao;