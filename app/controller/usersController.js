const path = require('path');
const location = path.join(__dirname + '/../');
const UserDataSchema = require('../model/usersModel');
const { Console } = require('console');

exports.index = async (req, res) => {

    if (req.session.email) {
        try {
            let data = await UserDataSchema.find();
            is_layout = true;
            res.render("../view/users/index", {
                is_layout: is_layout,
                data: data
            });
        } catch (error) {
            console.log('error: ', error);
        }
    } else {
        res.redirect("/");
    }
}

exports.addUser = (req, res) => {
    res.render("../view/users/add", { is_layout: true })
}

exports.addAction = async (req, res) => {

    try {
        let img_name = "";
        if (req.files) {
            const eavatar = req.files.avatar;
            const unixTimeStamp = Math.floor(Date.now() / 1000);
            const type = eavatar.mimetype;
            img_name = unixTimeStamp + "." + type.split('/')[1]
            eavatar.mv(location + "upload/" + img_name);
        }



        if (req.body.id) {
            const data = {
                vUserName: req.body.vUserName,
                vEmail: req.body.vEmail,
                iContact: req.body.iContact,
                vAvatar: img_name,
                eStatus: req.body.eStatus
            }

            await UserDataSchema.updateOne({ _id: req.body.id }, { $set: data })
        } else {
            const data = new UserDataSchema({
                vUserName: req.body.vUserName,
                vEmail: req.body.vEmail,
                iContact: req.body.iContact,
                vAvatar: img_name,
                eStatus: req.body.eStatus
            });

            await data.save();
        }

        res.redirect('/users');

    } catch (err) {
        console.log(err)
    }
}

exports.editUser = async (req, res) => {
    try {
        const data = await UserDataSchema.findById({ _id: req.params.id });
        res.render("../view/users/add", { is_layout: true, data: data, edit: true })

    } catch (err) {
        console.log(err)
    }
}

exports.deleteUser = async (req, res) => {

    try {
        await UserDataSchema.deleteOne({ _id: req.params.id });
        res.redirect('/users');

    } catch (err) {
        console.log(err)
    }
}