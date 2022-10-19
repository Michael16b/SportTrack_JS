var express = require("express");
var router = express.Router();
//dao
var activity_dao = require('../sport-track-db/activity_dao');

router.get("/", (req, res) => {
    try {
        //vérifier si le user est connecté
        if (req.session.idUser != null) {
            var acts = new Array();
            activity_dao.findAll().then((rows) => {
                //pour chaque activité
                rows.forEach((row) => {
                    //si l'activité appartient à l'utilisateur connecté
                    if (row.idUser == req.session.idUser) {
                        //ajouter l'activité à la liste des activités
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
        } else {
            //si aucun user connecté, renvoyer vers la page de connexion
            res.redirect('/connect');
        }

    } catch (error) {
        res.render("error", {
            message: "Une erreur est survenue",
            error: { status: 500, stack: "Veuillez réessayer" },
        });
    }
});

module.exports = router;