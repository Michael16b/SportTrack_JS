var createError = require("http-errors");
var path = require("path");
var fileUpload = require("express-fileupload");
var express = require("express");
var cookieParser = require("cookie-parser");
const session = require("express-session");

var logger = require("morgan");
var indexRouter = require("./routes/index");
//ajout
var usersRouter = require("./routes/users"); //Le fichier routes/users.js sera appelé pour traiter la requête http://localhost:3000/users.
var connectRouter = require("./routes/connect");
var uploadRouter = require("./routes/upload");
var activitiesRouter = require("./routes/activities");
var updateRouter = require("./routes/user_update");
var deleteRouter = require("./routes/user_delete");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(
    session({
        secret: "=dojmmR9E@Rl5wb",
        resave: false,
        saveUninitialized: false,
        cookie: {
            sameSite: "strict",
        },
    })
);
app.use(fileUpload({}));

app.use("/", indexRouter);
//ajout
app.use("/users", usersRouter);
app.use("/connect", connectRouter);
app.use("/upload", uploadRouter);
app.use("/list_activities", activitiesRouter);
app.use("/user_update", updateRouter);
app.use("/user_delete", deleteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;