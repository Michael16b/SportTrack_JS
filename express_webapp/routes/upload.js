var express = require("express");
var router = express.Router();
//model
const Activity = require('../sport-track-db/Activity');
const Data = require('../sport-track-db/Data');
//DAO
var activity_dao = require('../sport-track-db/activity_dao');
var data_dao = require('../sport-track-db/activity_entry_dao');
//calculs
const calc = require('../other/objet.js');


router.get("/", (req, res) => {
    res.render("upload", { title: "Importer un fichier" });
});

router.post("/", (req, res, next) => {
    try {
        //récupérer les infos du fichier
        json_data = JSON.parse(req.files.activites.data);

        //rentrer les données du json dans la bdd
        dataArray = new Array();

        //parcourir le json
        for (const value in json_data) {
            if (value == "data") {
                //récupérer les données de chaque data de l'activité et les sauvegarder
                json_data[value].map((data) => {
                    time = data.time;
                    cFreq = data.cardio_frequency;
                    latitude = data.latitude;
                    longitude = data.longitude;
                    altitude = data.altitude;

                    //sauvegarde dans un tableau annexe
                    dataArray.push(time, cFreq, latitude, longitude, altitude);
                });
            } else if (value == "activity") {
                //récupérer la date et la description de l'activité
                date = json_data[value].date;
                desc = json_data[value].description;
            } else {
                res.render("error", { message: "Erreur lors de l'importation du fichier", error: { status: "500", stack: "Erreur lors du parcours du fichier" } });
            }
        }

        //récupérer l'heure de début et de fin de l'activité et calculer la différence en convertissant en date
        var st = new Date(Date.parse("Janvier 01, 1999 " + dataArray[0]));
        var et = new Date(Date.parse("Janvier 01, 1999 " + dataArray[dataArray.length - 5]));
        //calculer la différence entre heure de déprt et d'arrivée et la convertir en string
        var diff = msToHMS(et.getTime() - st.getTime());

        //calculer la distance du parcours de l'activité 
        classCalc = new calc();
        let parcours = new Object();
        parcours.nom = "activity";

        //tableau d'objets contenant les coordonnées de chaque point du parcours
        data = new Array();

        for (let i = 2; i < dataArray.length; i += 5) {
            data.push({ 'lat': dataArray[i], 'lon': dataArray[i + 1] });
        }

        parcours.data = data;
        var distTotale = classCalc.calculDistanceTrajet(parcours);

        //récupérer les différentes fréquences cardiaques
        var minVal = 0;
        var maxVal = 2147483647;
        var avgVal = 0;
        var count = 0;
        var add = 0;

        //parcourir toutes les fréquences cardiaques
        for (let i = 1; i < dataArray.length; i += 5) {
            if (dataArray[i] < maxVal) {
                maxVal = dataArray[i];
            }
            if (dataArray[i] > minVal) {
                minVal = dataArray[i];
            }
            add = add + dataArray[i];
            count++;
        }

        tmp = minVal;
        minVal = maxVal; //fréquence cardiaque minimum
        maxVal = tmp; //fréquence cardiaque maximum
        avgVal = add / count; //fréquence cardiaque moyenne

        //init activity
        if (req.session.idUser == null) {
            res.redirect("connect");
        } else {
            var act = new Activity();
            act.init(1, desc, date, dataArray[0], diff, distTotale, minVal, avgVal, maxVal, req.session.idUser);

            //insert activityDAO
            activity_dao.insert(act, act.toTab()).then((result) => {
                //init data
                for (let i = 0; i < dataArray.length; i += 5) {
                    //init data
                    data = new Data();
                    data.init(123, dataArray[i], dataArray[i + 1], dataArray[i + 3], dataArray[i + 2], dataArray[i + 4], act.getIdAct());

                    //insert activityEntryDAO
                    data_dao.insert(data, data.toTab());
                }
            });

            res.render('upload_valid', { title: 'Fichier importé' });
        }
    } catch (error) {
        console.error(error);
        res.render("error", {
            message: "Erreur lors de l'importation du fichier",
            error: { status: 500, stack: "Erreur lors de l'importation du fichier" },
        });
    }
});

/**
 * Convertit une durée en millisecondes en une durée en heures, minutes et secondes
 * @param {Number} ms Durée en millisecondes
 * @returns {String} résultat de la conversion
 */
function msToHMS(ms) {
    // Convertir en secondes
    let seconds = ms / 1000;
    // Extraire les heures
    const hours = parseInt(seconds / 3600);
    seconds = seconds % 3600;
    // Extraire les minutes
    const minutes = parseInt(seconds / 60);
    // Nombre de secondes restantes
    seconds = seconds % 60;

    return hours.toString() + ":" + minutes.toString() + ":" + seconds.toString();
}

module.exports = router;