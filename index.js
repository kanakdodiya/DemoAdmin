const express = require("express");
const app = express();
const { engine } = require("express-handlebars");
const session = require("express-session");
require("dotenv").config();
const path = require("path");
const port = process.env.PORT || 9003;
const mongoose = require("mongoose");
const flash = require("express-flash");
const fileupload = require("express-fileupload");
const socket = require("socket.io", {
  forceNew: true,
});

//Connect to MongoDB
require("./app/config/databaseConfig")();

//Set Handlebars Framework
app.set("view engine", "handlebars");
app.use(fileupload());

app.use(express.static(__dirname + "/app/upload"));

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
      allowProtoMethodsByDefault: true,
    },
    partialsDir: __dirname + "/app/view/layouts",
    helpers: require("./app/helper/LogicHelper"),
    library: require("./app/library/GeneralLibrary"),
  })
);

app.use(async function (req, res, next) {
  try {
    //get url
    let current_route = req.originalUrl.replace(/\?.*$/, "").split("/");
    res.locals.route = current_route[1];
    res.locals.route2 = current_route[2];
    res.locals.route3 = current_route[3];
    next();
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
});

// Middleware to parse incoming request bodies with URL-encoded payloads
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

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
// const authRoute = require("./app/routes/authRoute");
// app.use("/", authRoute);
// const dashboardRoute = require('./app/routes/dashboardRoute');
// app.use('/dashboard',dashboardRoute);

require("./app/config/routeConfig")(app);

// Set up the port number for the server to listen on
app.set("port", process.env.PORT || 9003);

const server = app.listen(port, "0.0.0.0", () => {
  console.log("Server is running on port: " + port);
});

//socket-io
const UserModel = require('./app/model/authModel');
const io = socket(server, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", async (socket) => {
  console.log("a user connected");

  // this id came from front so we can auth uder tha cames online;
  let userId = socket.handshake.auth.token;
  userId = new mongoose.Types.ObjectId(userId);
  console.log('userId: ', userId);
  await UserModel.findByIdAndUpdate({ _id: userId }, { $set: { eOnline: "1" } })

  socket.broadcast.emit('getUserOnline',{userId: socket.handshake.auth.token});

  socket.on("disconnect", async () => {
    console.log("user disconnected");
    let userId = socket.handshake.auth.token
    await UserModel.findByIdAndUpdate({ _id: userId }, { $set: { eOnline: "0" } })
    socket.broadcast.emit('getUserOffline',{userId: socket.handshake.auth.token});
  });

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
  });
});
