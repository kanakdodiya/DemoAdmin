const UserModel = require('../model/authModel');

exports.index = async (req,res) => {
    if(req.session.email){
        let users = await UserModel.find().select('username eOnline').where('_id').ne(req.session.userId)

        res.render('../view/chat/index.handlebars',{
            is_layout:  true,
            users:users
        })
    }else{
        res.redirect('/')
    }
}

exports.ajax_listing = async(req,res) => {
    let userData = await UserModel.findById(req.body.iAdminId).select('username eOnline');
    // console.log('userData: ', userData);

    res.render('../view/chat/chatListing.handlebars',{
        is_layout:  false,
        userData:userData
    })
}