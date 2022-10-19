module.exports =
    class Data {
        constructor() {}
        __construct() {}
        init(st, long, lat, alt, idAct) {
            this.idData = -1;
            this.startTime = st;
            this.longitude = long;
            this.latitude = lat;
            this.altitude = alt;
            this.idAct = idAct;
        }
        getId() {
            return this.default;
        }
        getStartTime() {
            return this.startTime;
        }
        getLongitude() {
            return this.longitude;
        }
        getLatitude() {
            return this.latitude;
        }
        getAltitude() {
            return this.altitude;
        }
        getIdAct() {
            return this.idAct;
        }
        setId(id) {
            this.default = id;
        }
        getIdData() {
            return this.idData;
        }

        __toString() {
            return this.idData + this.startTime + " " + this.longitude + " " + this.latitude + " " + this.altitude;
        }
    }