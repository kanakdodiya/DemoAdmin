module.exports = app => {
    require("../routes/authRoute")(app)
    require("../routes/dashboardRoute")(app)
}