var express = require("express");
var user_dao = require("../sport-track-db/sport-track-db").user_dao;
var router = express.Router();

router.get("/", function (req, res) {
  res.render("connect", { title: "Connexion" });
});

router.post("/", function (req, res, next) {
  try {
    const { mail, mdp } = req.body;
    user_dao
      .connect(mail, mdp)
      .then((rows) => {
        if (rows && Object.values(rows)) {
          req.session.idUser = rows.idUser;
          res.redirect("/");
        } else {
          res.render("error", {
            message: "Le mail ou mot de passe n'est pas correct",
            error: { status: 500, stack: "Veuillez vous créer un compte" },
          });
        }
      })
      .catch((error) => {
        res.render("error", {
          message: "Une erreur est survenue",
          error: { status: 500, stack: "Veuillez réessayer" },
        });
      });
  } catch (error) {
    res.render("error", {
      message: "Une erreur est survenue",
      error: { status: 500, stack: "Veuillez réessayer" },
    });
  }
});

router.get("/disconnect", function (req, res) {
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
