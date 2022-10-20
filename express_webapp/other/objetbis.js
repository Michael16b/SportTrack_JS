module.exports =
    class CalculDistance {
        constructor() {}
        __construct() {}
            /**
             * Retourne la distance en mètres entre 2 points GPS exprimés en degrés.
             * @param float $lat1 Latitude du premier point GPS
             * @param float $long1 Longitude du premier point GPS
             * @param float $lat2 Latitude du second point GPS
             * @param float $long2 Longitude du second point GPS
             * @return float La distance entre les deux points GPS
             */

        R = 6378.137;


        degreVersRad(deg) {
            return Math.PI * (deg) / 180;
        }


        calculDistance2PointsGPS(lat1, long1, lat2, long2) {
            lat1 = this.degreVersRad(lat1);
            lat2 = this.degreVersRad(lat2);
            long1 = this.degreVersRad(long1);
            long2 = this.degreVersRad(long2);
            return (this.R * Math.acos(Math.sin(lat2) * Math.sin(lat1) + Math.cos(lat2) * Math.cos(lat1) * Math.cos(long2 - long1)));
        }


        /**
         * Retourne la distance en mètres du parcours passé en paramètres. Le parcours est
         * défini par un tableau ordonné de points GPS.
         * @param Array $parcours Le tableau contenant les points GPS
         * @return float La distance du parcours
         */

        calculDistanceTrajet(parcours) {
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



    }


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