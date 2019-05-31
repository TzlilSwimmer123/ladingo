class db {
    mysql = require('mysql');
    con = this.mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "1234",
        database: "ladingo",
        dateStrings: true
    });

    constructor(){
    this.con.connect(function(err) {
            if (err) throw err;
            console.log("Connected!");
        })

    }

    getItem(callback, itemID) {
        let sql = `SELECT * FROM tracking where item_id=` + itemID;
        this.con.query(sql,
            function (err, rows) {
                callback(err, rows);
            }
        );
    }
}

module.exports  = db;