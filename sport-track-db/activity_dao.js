var db = require('./sqlite_connection');

activityDAO = function() {
    this.insert = function(values) {
        let query = "insert into Activities(description,date,startTime,duration,distance,cardiacFreqMin,cardiacFreqAvg, cardiacFreqMax,idUser) values ($desc,$date,$st,$du,$dis,$cFreqMin,$cFreqAvg,$cFreqMax,$idUser)";
        db.run(query, values, (err) => {
            if (err) {
                console.log(err);
            }
        });
    };

    this.selectAcitvity = function(user, callback) {
        let query = "SELECT * FROM Activity WHERE eMail = $eMail AND password = $password";
        values = [user.getMail(), user.getPassword()];
        db.get(query, values, callback);
    }

    this.update = function(values) {
        let query = "update Activities set description = $desc , date = $date,startTime = $st,duration = $du ,distance = $dis,cardiacFreqMin = $cFreqMin, cardiacFreqAvg = $cFreqAvg, cardiacFreqMax = $cFreqMax, idUser = $idUser WHERE idAct = $id";
        db.run(query, values);

    };
    this.delete = function(key) {
        let query = "delete from Activities where idAct = ?";
        db.run(query, key);
    };
    this.findAll = function(callback) {
        let query = "SELECT * FROM Activities";
        db.all(query, [], callback);
    };

    this.findByKey = function(values, callback) {
        let query = "SELECT * FROM Activities WHERE idAct = ?";
        db.run(query, values, callback);
    };
    this.deleteAll = function() {
        let query = "delete from Activities";
        db.run(query, (err) => {
            if (err) {
                console.log(err);
            }
        });
    };
};
var dao = new activityDAO();
module.exports = dao;