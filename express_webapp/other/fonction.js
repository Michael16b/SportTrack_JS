calculDistance2 = function() {
    this.degreVersRad = function(deg) {
        return Math.PI * (deg) / 180;
    }
    this.calculDistance2PointsGPS = function(lat1, long1, lat2, long2) {
        lat1 = this.degreVersRad(lat1);
        lat2 = this.degreVersRad(lat2);
        long1 = this.degreVersRad(long1);
        long2 = this.degreVersRad(long2);
        return (this.R * Math.acos(Math.sin(lat2) * Math.sin(lat1) + Math.cos(lat2) * Math.cos(lat1) * Math.cos(long2 - long1)));
    }
    this.calculDistanceTrajet = function(parcours) {
        var distTotale = 0;
        for (let i = 0; i < parcours.data.length - 1; i++) {
            distTotale += this.calculDistance2PointsGPS(
                (parcours.data[i]["latitude"]),
                (parcours.data[i]["longitude"]),

                (parcours.data[i + 1]["latitude"]),
                parcours.data[i + 1]["longitude"]);
        }
        return distTotale * 1000;
    }

};
var dao = new calculDistance2();
module.exports = dao;