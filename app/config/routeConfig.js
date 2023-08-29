module.exports = app => {
    require("../routes/authRoute")(app);
    require("../routes/dashboardRoute")(app);
    require("../routes/adminRoute")(app);
    require("../routes/userRoute")(app);
    require("../routes/systemEmailRoute")(app);
    require("../routes/settingRoute")(app);
    
    app.all('*',(req,res) => {
        res.render('../view/error/404.handlebars',{})
    })
}