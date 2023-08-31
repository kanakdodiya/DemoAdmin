const systemEmailModel = require('../model/systemEmailModel');

exports.index = async (req, res) => {
    if (req.session.email) {
        try {
            res.render('../view/systemEmail/index', {
                is_layout: true,
            });
        } catch (error) {
            console.error('error: ', error);
            res.redirect('/dashboad')
        }

    } else {
        res.redirect('/')
    }
}

exports.add = async (req, res) => {

    if (req.session.email) {
        try {
            is_layout = true;
            res.render("../view/systemEmail/add", {
                is_layout: is_layout,
            });

        } catch (error) {
            console.error(error);
            res.redirect("/system-email");

        }
    } else {
        res.redirect("/");
    }
};

exports.ajax_listing = async (req, res) => {
    if (req.session.email) {

        try {
            const systemEmailData = await systemEmailModel.find().select('vEmailCode eStatus');
            res.render("../view/systemEmail/ajax_listing", {
                layout: false,
                systemEmailData: systemEmailData,
            });

        } catch (error) {
            console.error('error: ', error);
            res.redirect("/system-email");
        }
    } else {
        res.redirect('/');
    }

}


exports.add_action = async (req, res) => {
    if (req.session.email) {

        if (req.body.iSystemEmailId) {
            try {
                const { vEmailCode, vEmailTitle, vFromName, vFromEmail, vCcEmail, vBccEmail, vEmailSubject, tEmailMessage, tSmsMessage, tInternalMessage, eStatus } = req.body;
                const UPDATE_QUERY = {
                    "$set": { vEmailCode, vEmailTitle, vFromName, vFromEmail, vCcEmail, vBccEmail, vEmailSubject, tEmailMessage, tSmsMessage, tInternalMessage, eStatus }
                };

                await systemEmailModel.findOneAndUpdate({ _id: req.body.iSystemEmailId }, UPDATE_QUERY);
                req.flash('success', 'System Email Edited Successfully..!');
                return res.redirect('/system-email');
            } catch (error) {
                console.error(error);
                req.flash('error', 'An error occurred while editing the system email.');
                return res.redirect('/system-email');
            }
        } else {
            try {
                const { vEmailCode, vEmailTitle, vFromName, vFromEmail, vCcEmail, vBccEmail, vEmailSubject, tEmailMessage, tInternalMessage, eStatus } = req.body

                const SystemEmail = new systemEmailModel({ vEmailCode, vEmailTitle, vFromName, vFromEmail, vCcEmail, vBccEmail, vEmailSubject, tEmailMessage, tInternalMessage, eStatus });
                await SystemEmail.save();
                req.flash('success', 'System Email Create Successfully..!');
                return res.redirect('/system-email');
            } catch (error) {
                console.error(error);
                req.flash('error', 'Something Went Wrong');
                res.redirect('/system-email');
            }
        }

    } else {
        res.redirect('/');
    }
};


exports.edit = async (req, res) => {
    if (req.session.email) {
        try {
            const iSystemEmailId = req.params.iSystemEmailId;
            var systemEmailData = await systemEmailModel.findOne({ _id: iSystemEmailId });
            is_layout = true;
            res.render("../view/systemEmail/add", {
                is_layout: is_layout,
                edit: true,
                systemEmailData: systemEmailData
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
        try {
            const iSystemEmailId = req.params.id;
            const deletedData = await systemEmailModel.findByIdAndDelete(iSystemEmailId);
            if (deletedData) {
                req.flash('success', 'System Email Deleted Successfully');
            } else {
                req.flash('error', 'System Email Not Found');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            req.flash('error', 'An error occurred while deleting the System Email');
        } finally {
            res.redirect('/system-email');
        }
    } else {
        res.redirect('/');
    }

}