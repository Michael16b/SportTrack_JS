function CalculDistance() {}

R = 6378.137;


CalculDistance.prototype.degreVersRad = function(deg) {
    return Math.PI * (deg) / 180;
}

CalculDistance.prototype.calculDistance2PointsGPS = function(lat1, long1, lat2, long2) {
    lat1 = CalculDistance.prototype.degreVersRad(lat1);
    lat2 = CalculDistance.prototype.degreVersRad(lat2);
    long1 = CalculDistance.prototype.degreVersRad(long1);
    long2 = CalculDistance.prototype.degreVersRad(long2);
    return (R * Math.acos(Math.sin(lat2) * Math.sin(lat1) + Math.cos(lat2) * Math.cos(lat1) * Math.cos(long2 - long1)));
}

CalculDistance.prototype.calculDistanceTrajet = function(parcours) {
    var distTotale = 0;
    for (let i = 0; i < parcours.data.length - 1; i++) {
        distTotale += CalculDistance.prototype.calculDistance2PointsGPS(
            (parcours.data[i]["latitude"]),
            (parcours.data[i]["longitude"]),

            (parcours.data[i + 1]["latitude"]),
            parcours.data[i + 1]["longitude"]);
    }
    return distTotale * 1000;
}



var classCalc = new CalculDistance();

trajet = {
    "activity": {
        "date": "01/09/2022",
        "description": "IUT -> RU"
    },
    "data": [
        { "time": "13:00:00", "cardio_frequency": 99, "latitude": 47.644795, "longitude": -2.776605, "altitude": 18 },
        { "time": "13:00:05", "cardio_frequency": 100, "latitude": 47.646870, "longitude": -2.778911, "altitude": 18 },
        { "time": "13:00:10", "cardio_frequency": 102, "latitude": 47.646197, "longitude": -2.780220, "altitude": 18 },
        { "time": "13:00:15", "cardio_frequency": 100, "latitude": 47.646992, "longitude": -2.781068, "altitude": 17 },
        { "time": "13:00:20", "cardio_frequency": 98, "latitude": 47.647867, "longitude": -2.781744, "altitude": 16 },
        { "time": "13:00:25", "cardio_frequency": 103, "latitude": 47.648510, "longitude": -2.780145, "altitude": 16 }
    ]
}




console.log(classCalc.calculDistanceTrajet(trajet))