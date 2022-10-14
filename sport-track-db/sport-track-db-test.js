var User = require('./User');
var user_dao = require('./sport-track-db').user_dao;
var Activity = require('./Activity');
var activity_DAO = require('./sport-track-db').activityDAO;
var db = require('./sport-track-db').db_connection;



var user = new User();
var user2 = new User();
var activity = new Activity();

user_dao.deleteAll(function(err) {
    if (err) {
        console.log(err);
    }

    testInsertUser();
});

console.log("All users deleted");
console.log("TEST : UserDAO");


function testInsertUser() {
    user.init("Doe", "John", "1990-01-01", "M", 180, 80, "john.eMail@gmail.com", "123456");
    user2.init("Besily", "Michaël", "2003-10-01", "M", 180, 80, "Michael.besily@gmail.com", "123456");
    user_dao.insert(user, (err) => {
        if (err) {
            console.log(err);
        }
        testSelectUser();
    });
}

function testSelectUser() {
    user_dao.selectUser(user, (err, row) => {
        if (err) {
            console.log(err);
        }
        var user = row
        var idUser = user.idUser
        console.log("User inserted with id : " + idUser);
        testfindByKey(idUser);
    });
}


function testfindByKey(idUser) {
    console.log("Test : findByKey ")
    user_dao.findByKey(idUser, (err, row) => {
        if (err) {
            console.log(err);
        }
        console.log(row);
        testUpdateUser(idUser);
    })
}

function testUpdateUser(idUser) {
    console.log("Test : update ")
    user_dao.update(user2, idUser, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("User updated");
    })
    testDeleteUser(idUser);
};


function testDeleteUser(idUser) {
    console.log("Test : delete ")
    user_dao.delete(idUser, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("User deleted");
        testDeleteAllActivities();
    })
}



function testDeleteAllActivities() {
    console.log("TEST : ActivityDAO");
    activity_DAO.deleteAll((err) => {
        if (err) {
            console.log(err);
        }
        console.log("All activities deleted");
        testInsertActivity();
    })
}

function testInsertActivity() {
    console.log("Test : insert Activity")
    user_dao.insert(user, (err) => {
        if (err) {
            console.log(err);
        }
        selectUser(user, (err, id) => {
            if (err) {
                console.log(err);
            }
            var idUser = id
            console.log("User inserted with id : " + idUser);
            activity.init("Pétanque", "18/08/2022", "16:00:00", "00:10:00", 10, 75, 110, 150, idUser);
            activity_DAO.insert(activity, (err) => {
                if (err) {
                    console.log(err);
                }
                console.log("Activity inserted");
                selectActivity(activity, (err, idAct) => {
                    if (err) {
                        console.log(err);
                    }
                    var idAct = idAct
                    console.log("Activity inserted with id : " + idAct);
                    testFindByKeyActivities(idAct);
                })
            })

        })
    })
}


function selectUser(user, callback) {
    user_dao.selectUser(user, (err, row) => {
        if (err) {
            console.log(err);
        }
        var user = row
        callback(err, user.idUser);
    });
}

function selectActivity(activity, callback) {
    activity_DAO.selectActivity(activity, (err, row) => {
        if (err) {
            console.log(err);
        }
        var activity = row
        callback(err, activity.idAct);
    });
}


function testFindByKeyActivities(idAct) {
    console.log("Test : findByKey Activity")
    activity_DAO.findByKey(idAct, (err, row) => {
        if (err) {
            console.log(err);
        }
        console.log(row);
        testUpdateActivity(idAct);
    })
}

function testUpdateActivity(idAct) {
    console.log("Test : update Activity")
    selectUser(user, (err, id) => {
        if (err) {
            console.log(err);
        }
        var idUser = id
        console.log("User inserted with id : " + idUser);
        activity.init("FootBall", "18/08/2022", "18:00:00", "00:05:00", 10, 75, 110, 150, idUser);
        activity_DAO.update(activity, idAct, (err) => {
            if (err) {
                console.log(err);
            }
            console.log("Activity updated");
        })
    })
    testDeleteActivity(idAct);
}

function testDeleteActivity(idAct) {
    console.log("Test : delete Activity")
    activity_DAO.delete(idAct, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("Activity deleted");
    })
}