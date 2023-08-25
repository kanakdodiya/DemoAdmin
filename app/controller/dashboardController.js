

exports.index = async (req,res) =>{
    if(req.session.email){
        res.render('../view/dashboard/index.handlebars',{
            is_layout: true
        });
    }else{
        res.redirect('/')
    }
}