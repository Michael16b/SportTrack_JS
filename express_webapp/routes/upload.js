const Activity = require('../sport-track-db/Activity');
const Data = require('../sport-track-db/Data');
var activity_dao = require('../sport-track-db/activity_dao');
var data_dao = require('../sport-track-db/activity_entry_dao');
var CalculDistance = require('../other/objetbis');
var express = require("express");
const { activityEntryDAO } = require('../sport-track-db/sport-track-db');
var router = express.Router();


router.get("/", (req, res) => {
    res.render("upload", { title: "Importer un fichier" });
});

router.post("/", (req, res, next) => {
    try {
        json_data = JSON.parse(req.files.activites.data);

        dataArray = new Array();
        for (const data in json_data) {
            if (data == "data") {
                json_data[data].map((data) => {
                    time = data.time;
                    cFreq = data.cardio_frequency;
                    latitude = data.latitude;
                    longitude = data.longitude;
                    altitude = data.altitude;
                    dataArray.push(time, cFreq, longitude, latitude, altitude);
                });
            } else if (data == "activity") {
                date = json_data[data].date;
                desc = json_data[data].description;
            } else {
                res.render("error", { message: "Erreur lors de l'importation du fichier", error: { status: "500", stack: "Erreur lors du parcours du fichier" } });
            }
        }


        var startTime = dataArray[0]
        var duration = new Date(Date.parse("Janvier 01, 1999 " + dataArray[dataArray.length - 5])) - new Date(Date.parse("Janvier 01, 1999 " + startTime));

        var classCalc = new CalculDistance();
        data = new Array();
        for (let i = 2; i < dataArray.length; i += 5) {
            data.push({ 'latitude': dataArray[i], 'longitude': dataArray[i + 1] });
        }

        var distance = classCalc.calculDistanceTrajet({ 'data': data });



        var minCardio = dataArray[1];
        var avgCardio = dataArray[1];
        var maxCardio = dataArray[1];
        for (let i = 6; i < dataArray.length; i += 5) {
            if (dataArray[i] < minCardio) {
                minCardio = dataArray[i];
            }
            if (dataArray[i] > maxCardio) {
                maxCardio = dataArray[i];
            }
            avgCardio += dataArray[i];
        }
        avgCardio = avgCardio / (dataArray.length / 5);


        if (req.session.idUser == null) {
            res.redirect("connect");
        } else {
            var activity = new Activity();
            activity.init(desc, date, startTime, duration, distance, minCardio, avgCardio, maxCardio, req.session.idUser);

            activity_dao.insert(activity, (err) => {
                if (err) {
                    console.log(err);
                }
                activity_dao.selectActivity(activity, (err, row) => {
                    if (err) {
                        console.log(err);
                    }
                    var activity = row;
                    var idAct = activity.idAct;
                    var data = new Data();
                    data.init(startTime, dataArray[2], dataArray[3], dataArray[4], idAct);
                    data_dao.insert(data, (err) => {
                        if (err) {
                            console.log(err);
                        }
                        res.render("upload_valid", { title: "Importer un fichier", message: "Fichier importé avec succès" });
                    });
                });
            });
        }
    } catch (error) {
        console.error(error);
        res.render("error", {
            message: "Erreur lors de l'importation du fichier",
            error: { status: 500, stack: "Erreur lors de l'importation du fichier" },
        });
    }
});

module.exports = router;