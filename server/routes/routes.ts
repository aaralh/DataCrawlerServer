module.exports = (app) => {
    const databaseController = require("../controllers/responseController");

    app.route("/currency/:cryptoName")
        .get(databaseController.getHistory)
        .post(databaseController.getHistoryWithTimeFrame);
};
