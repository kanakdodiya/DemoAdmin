const authModel = require('../model/authModel')

exports.index = async (req, res) => {
    if (req.session.email) {
        try {
            let userData = await authModel.find({}).select('username email status')
            is_layout = true;
            res.render("../view/admin/index", {
                is_layout: is_layout,
                userData: userData
            });
        } catch (error) {
            console.log('error: ', error);
        }
    } else {
        res.redirect("/");
    }

};

exports.ajax_listing = async (req,res) => {
    if(req.session.email){
        try {
            console.log('userData: ');
            let adminData = await authModel.find();

            res.render("../view/admin/ajax_listing", {
                layout: false,
                adminData: adminData,
                // iAgentId:req.session.userid
            });
            
        } catch (error) {
            console.log('error: ', error);
        }
    }else{
        res.status(401).send("Unauthorized")
    }
}


exports.add = async (req, res) => {
    if (req.session.email) {
        is_layout = true;
        res.render("../view/admin/add", {
            is_layout: is_layout,
        });
    } else {
        res.redirect("/");
    }

};

exports.edit = async (req, res) => {

    var iAuthId = req.params.iAuthId;

    if (req.session.email) {
        try {
            let adminData = await authModel.findOne({
                _id: iAuthId
            }).select('username email status +password');
            console.log('adminData: ', adminData);
            is_layout = true;
            res.render("../view/admin/add", {
                is_layout: is_layout,
                adminData: adminData,
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        res.redirect("/");
    }

};

exports.delete = async (req, res) => {
    if (req.session.email) {
        const iAuthId = req.params.iAuthId
        let deletedData = await authModel.findByIdAndDelete(iAuthId);
        if (deletedData) {
            req.flash('success', "Admin Deleted Successfully")
            res.redirect("/admin");
        }
    } else {
        res.redirect("/");
    }

};