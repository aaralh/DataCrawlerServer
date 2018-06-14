const sqlite3 = require('sqlite3').verbose();

exports.getHistory = (req, res) => {
    const db = new sqlite3.Database("./DataCrawler/coinData.db");
    const query = `SELECT * FROM ${req.params.cryptoName}`;
    db.all(query, (err, rows) => {
        db.close();
        res.json(rows);
    });
};

exports.getHistoryWithTimeFrame = (req, res) => {
    const db = new sqlite3.Database("./DataCrawler/coinData.db");
    const startMillis = req.body.start;
    const endMillis = req.body.end;
    const query = `SELECT * FROM ${req.params.cryptoName} WHERE timestamp BETWEEN ${startMillis} AND ${endMillis}`;
    console.log(query);
    db.all(query, (err, rows) => {
        db.close();
        res.json(rows);
    });
};
