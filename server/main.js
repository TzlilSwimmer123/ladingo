const db = require("./db/db.js");
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const server = require('http').Server(app);
const port = 3000;
const helmet = require('helmet');
const dbHandler = new db();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

//pre-flight requests
app.options('*', function(req, res) {
    res.send(200);
});

server.listen(port, (err) => {
    if (err) {
        throw err;
    }
    console.log('Node Endpoints working :)');
});

app.get('/details', (req, res) => {
    res.status(200);
    if (Object.keys(req.query).indexOf("item_id") != -1) {
        let itemID = req.query["item_id"];
        if (itemID) {
            dbHandler.getItem(function (err, trackingResult) {
                //you might want to do something is err is not null...
                res.end(JSON.stringify({
                    "results": trackingResult
                }))
            }, itemID);
        } else {
            res.end();
        }
    } else {
        res.end();
    }

});

module.exports = server;





