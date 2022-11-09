const mysql = require('mysql')

var conn  = mysql.createConnection({


    host:'192.168.7.133',
    port:'3306',
    user:'bogdan',
    password:'root',
    database:'scriptAPP'


})

module.exports = conn
