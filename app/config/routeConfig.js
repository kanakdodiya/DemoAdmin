module.exports = app => {
    require("../routes/authRoute")(app)
    require("../routes/dashboardRoute")(app)
    
    app.all('*',(req,res) => {
        res.render('../view/error/404.handlebars',{})
    })
}