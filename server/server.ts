let express = require("express");
let port = process.env.PORT || 3000;
let bodyParser = require("body-parser");

let path = require("path");

let app = express();
let server = require("http").createServer(app);
// let io = require('socket.io')(server);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



let routes = require("./routes/routes"); //importing route
routes(app); //register the route


server.listen(port, () => {
    console.log(`Server listening at port ${port}`);
});
