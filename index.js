const express = require('express');
const app = express();
const { engine } = require("express-handlebars");
const session = require("express-session");
require('dotenv').config();
const path = require('path');
const port = process.env.PORT || 9003;
const mongoose = require('mongoose');
const flash = require("express-flash");


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

// Middleware to parse incoming request bodies with URL-encoded payloads
app.use(express.urlencoded({
    extended: true
}));


// Configure session management middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

// Middleware for handling flash messages
app.use(flash());

//In Express, res.locals is an object that provides a way to pass data from your server-side code (middleware, route handlers, etc.) to your view templates (like Handlebars, EJS, Pug, etc.)
app.use(async function (req, res, next) {
    res.locals.session = req.session;
    res.locals.sessionFlash = req.flash();
    next();
});

// Mount the authentication routes
const authRoute = require("./app/routes/authRoute");
app.use("/", authRoute);


// Set up the port number for the server to listen on
app.set("port", process.env.PORT || 9003);


app.listen(port, "0.0.0.0", () => {
    console.log("Server is running on port: " + port);
});
