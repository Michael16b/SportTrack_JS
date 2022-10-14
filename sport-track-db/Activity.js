class Activity {
    constructor() {}
    __construct() {}
    init(desc, d, du, st, dis, cFreqMin, cFreqAvg, cFreqMax, idU) {
        this.description = desc;
        this.date = d;
        this.duration = du;
        this.startTime = st;
        this.distance = dis;
        this.cardiacFreqMin = cFreqMin;
        this.cardiacFreqAvg = cFreqAvg;
        this.cardiacFreqMax = cFreqMax;
        this.idUser = idU;
    }
    getId() {
        return this.default;
    }
    getIdActivity() {
        return this.idAct;
    }
    getDesc() {
        return this.description;
    }
    getDate() {
        return this.date;
    }
    getStartTime() {
        return this.startTime;
    }
    getDuration() {
        return this.duration;
    }
    getDistance() {
        return this.distance;
    }
    getCardiacFreqMin() {
        return this.cardiacFreqMin;
    }
    getCardiacFreqAvg() {
        return this.cardiacFreqAvg;
    }
    getCardiacFreqMax() {
        return this.cardiacFreqMax;
    }
    getIdUser() {
        return this.idUser;
    }
    setId(id) {
        this.default = id;
    }
    __toString() {
        return this.idData + this.idAct + " " + this.description + " " + this.distance + " " + this.date + " " + this.startTime + " " + this.duration + " " + this.distance + " " + this.cardiacFreqMin + " " + this.cardiacFreqAvg + " " + this.cardiacFreqMax + " " + this.idUser;
    }
}

Activity.class = "Activity";
return Activity;

var activity = new Activity();
module.exports = activity;