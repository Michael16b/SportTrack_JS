var express = require("express");
var router = express.Router();
//dao
var activity_dao = require('../sport-track-db/activity_dao');

router.get("/", (req, res) => {
    try {
        //vérifier si le user est connecté
        if (req.session.idUser != null) {
            activity_dao.findAll((err, rows) => {
                if (err) {
                    console.log(err);
                }
                var acts = new Array();
                rows.forEach((row) => {
                    if (row.idUser == req.session.idUser) {
                        var data = [
                            row.description,
                            row.date,
                            row.startTime,
                            row.duration,
                            row.distance,
                            row.cardiacFreqMin,
                            row.cardiacFreqAvg,
                            row.cardiacFreqMax
                        ];
                    }
                    acts.push(data);
                });
                console.log(acts)
                res.render('list_activities', { title: 'Liste des activités', acts: acts });
            });
        }


    } catch (error) {
        res.render("error", {
            message: "Une erreur est survenue",
            error: { status: 500, stack: "Veuillez réessayer" },
        });
    }
});

module.exports = router;