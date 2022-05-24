const mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    port: 3306,
    useSSL: false,
    timezone: 'UTC',
    user: 'root',
    password: 'Practicing999',
    database: 'fenix',
    insecureAuth : true
});

module.exports = connection;