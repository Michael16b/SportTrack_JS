var db = require('./sqlite_connection',
    './user_dao');


var user = new UserDAO();

user.insert("test", "test", "test", "test", "test", "test", "test", "test", function(result) {
    console.log(result);
});