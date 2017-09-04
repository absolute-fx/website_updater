const mysql = require('mysql');

let MySQL = Object.create({
    host: "localhost",
    user: 'root',
    password: null,
    database: 'electron',
    connection: null,
    connect: () => {
        if (this.connection == null)
        {
            this.connection = mysql.createConnection({
                host: this.host,
                user: this.user,
                password: this.password,
                database: this.database
            });
            this.connection.connect((err) => {
                if (err) {
                    console.log('Connexion failed');
                    throw err;
                }
            });
        }
        return this;
    },
    query:(sql) => {
        this.connection.query(sql, function(err, rows, fields) {
            if (err) {
                console.log("An error ocurred performing the query.");
                console.log(err);
                throw err;
                return;
            }
            return {rows: rows, fields: fields};
        });
    }
});

function alertMe(msg)
{
    alert(msg);
}

module.exports.MySQL = MySQL;
module.exports.alertMe = alertMe;