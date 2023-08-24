const express = require('express');
const app = express();
const { engine } = require("express-handlebars");
const session = require("express-session");
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 9003;
const mongoose = require('mongoose');

//Connect to MongoDB 
 require('./app/config/databaseConfig')();

//Set Handlebars Framework
app.set("view engine", "handlebars");

//middleware to serve static files from the "public" directory
app.use(express.static(__dirname + "/public"));

// Express application to look for views (templates) in the "app/view" directory,
app.set("views", path.join(__dirname, "app/view"));


// Configure Handlebars template engine with custom options and helpers.
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

// Configure session management middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

// Mount the authentication routes
const authRoute = require("./app/routes/authRoute");
app.use("/", authRoute);



app.set("port", process.env.PORT || 9003);


app.listen(port, "0.0.0.0", () => {
    console.log("Server is running on port: " + port);
});
