const express = require('express');
const app = express();
const { engine } = require("express-handlebars");
const session = require("express-session");
require('dotenv').config();
const port = process.env.PORT
console.log('port: ', port);

//Setup Handlebars Library
app.engine(
    "handlebars",
    engine({
        defaultLayout: "index",
        runtimeOptions: {
            allowProtoPropertiesByDefault: true,
            allowProtoMethodsByDefault: true
        },
        partialsDir: __dirname + "/app/view/layouts",
        helpers: require("./app/helper/LogicHelper"),
        library: require('./app/library/GeneralLibrary'),
    })
);

//Setup Session Manager
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);


app.set("port", process.env.PORT);

app.listen(port, "0.0.0.0", () => {
    console.log("Server is running on port: " + port);
});
