const mysql = require('mysql')

var conn  = mysql.createConnection({


    host:'192.168.100.53',
    port:'3306',
    user:'bogdan',
    password:'root',
    database:'scriptAPP'


})

module.exports = conn