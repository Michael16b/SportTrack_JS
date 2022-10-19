var express = require("express");
var router = express.Router();
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "SportTrack", sessionId: req.session.idUser });
});

module.exports = router;
