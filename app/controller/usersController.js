const path = require('path');
const location = path.join(__dirname + '/../');
const userModel = require('../model/usersModel');
const { Console } = require('console');
const fs = require('fs')

exports.index = async (req, res) => {
    if (req.session.email) {
        try {
            is_layout = true;
            res.render("../view/users/index", {
                is_layout: is_layout,
            });
        } catch (error) {
            console.log('error: ', error);
        }
    } else {
        res.redirect("/");
    }
}
exports.ajax_listing = async (req, res) => {
    if (req.session.email) {
        try {

            let { iUserId, vAction, searchInput } = req.body

            if (vAction === "search" || vAction === "delete" || vAction === "multiple_delete") {

                if (vAction === "delete" && iUserId != null) {
                    await userModel.findByIdAndDelete(iUserId);
                }

                if (vAction === "multiple_delete" && iUserId != null) {
                    let userIDs = iUserId.split(',');

                    await userModel.deleteMany({
                        _id: {
                            $in: userIDs
                        }
                    });
                }

                let searchSQL = {};
                if (searchInput.length > 0) {
                    let generalSearch = new RegExp(searchInput, "i");
                    searchSQL.$or = [
                        { vUserName: generalSearch },
                        { vEmail: generalSearch },
                        { iContact: generalSearch },
                        { eStatus: new RegExp(searchInput) }
                    ];
                }

                let userData = await userModel.find(searchSQL);

                res.render("../view/users/ajax_listing", {
                    layout: false,
                    userData: userData,
                });
            }

        } catch (error) {
            console.error('error: ', error);
            return res.status(500).send({
                message: 'error!'
            });

        }

    } else {
        res.status(401).send("Unauthorized")
    }
}

exports.addUser = (req, res) => {
    res.render("../view/users/add", { is_layout: true })
}

exports.addAction = async (req, res) => {
    if (req.session.email) {

        try {
            let img_name = "";
            if (req.files) {
                const eavatar = req.files.avatar;
                const unixTimeStamp = Math.floor(Date.now() / 1000);
                const type = eavatar.mimetype;
                img_name = unixTimeStamp + "." + type.split('/')[1]
                eavatar.mv(location + "upload/" + img_name);
            }

            let action = '';
            if (req.body.id) {
                let data = {
                    vUserName: req.body.vUserName,
                    vEmail: req.body.vEmail,
                    iContact: req.body.iContact,
                    eStatus: req.body.eStatus
                }

                if (img_name !== "" && img_name) {
                    data.vAvatar = img_name;
                }

                await userModel.updateOne({ _id: req.body.id }, { $set: data });
                action = 'updated';
            } else {
                const data = new userModel({
                    vUserName: req.body.vUserName,
                    vEmail: req.body.vEmail,
                    iContact: req.body.iContact,
                    vAvatar: img_name,
                    eStatus: req.body.eStatus
                });
                await data.save();
                action = 'created';

            }
            req.flash('success', `User ${action} successfully`);

        } catch (err) {
            let errors = {};

            //For Validation Errors
            if (err.name === "ValidationError") {
                Object.keys(err.errors).forEach((key) => {
                    errors[key] = err.errors[key].message;
                });
                // return res.status(400).send(errors);
            }

            // For Duplicate Values
            if (err.code === 11000) {
                const duplicateField = Object.keys(err.keyPattern)[0];
                errors[`${duplicateField}`] = `${duplicateField} Is Already Exists`;
                console.log('errors: ', errors);
                // return res.status(400).send(errors);
            }

            // For Other Errors
            if (Object.keys(errors).length === 0) {
                console.error('Other error:', err);
                req.flash('error', 'Something Went Wrong');
            }


            Object.keys(errors).forEach(key => {
                if (errors[key]) {
                    req.flash('error', errors[key]);
                }
            });
        }
        finally {
            res.redirect('/users');
        }
    }
}

exports.editUser = async (req, res) => {
    if (req.session.email) {
        try {
            const data = await userModel.findById({ _id: req.params.id });
            is_layout = true;
            res.render("../view/users/add", {
                is_layout: is_layout,
                data: data,
                edit: true
            });
        } catch (error) {
            console.log('error: ', error);
        }
    } else {
        res.redirect("/");
    }
}

exports.deleteUser = async (req, res) => {
    if (req.session.email) {
        try {
            const iUserId = req.params.id;
            const deletedData = await userModel.findByIdAndDelete(iUserId);

            if (deletedData) {
                let dir = location + "upload/" + deletedData.vAvatar
                if (fs.existsSync(dir)) {
                    fs.unlinkSync(dir);
                }
                req.flash('success', 'User Deleted Successfully');
            } else {
                req.flash('error', 'User Not Found');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            req.flash('error', 'An error occurred while deleting the user');
        } finally {
            res.redirect('/users');
        }
    } else {
        res.redirect('/');
    }


}