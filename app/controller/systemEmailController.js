const systemEmailModel = require('../model/systemEmailModel');

exports.index = async (req, res) => {
    if (req.session.email) {
        res.render('../view/systemEmail/index.handlebars', {
            is_layout: true
        });
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
            console.log(error);
        }
    } else {
        res.redirect("/");
    }
};

exports.ajax_listing = async (req, res) => {
    try {
        const systemEmailData = await systemEmailModel.find().select('vEmailCode eStatus');
        console.log('systemEmailData: ', systemEmailData);
        res.render("../view/systemEmail/ajax_listing", {
            layout: false,
            systemEmailData: systemEmailData,
        });

    } catch (error) {
        console.error('error: ', error);

    }

}


exports.add_action = async (req, res) => {
    console.log('add_action');

    if (req.session.email) {

        if (req.body.iSystemEmailId) {
            try {
                let UPDATE_QUERY = {
                    "$set": {
                        "vEmailCode": req.body.vEmailCode,
                        "vEmailTitle": req.body.vEmailTitle,
                        "vFromName": req.body.vFromName,
                        "vFromEmail": req.body.vFromEmail,
                        "vCcEmail": req.body.vCcEmail,
                        "vBccEmail": req.body.vBccEmail,
                        "vEmailSubject": req.body.vEmailSubject,
                        "tEmailMessage": req.body.tEmailMessage,
                        "tSmsMessage": req.body.tSmsMessage,
                        "tInternalMessage": req.body.tInternalMessage,
                        "eStatus": req.body.eStatus,
                    }
                }
                await systemEmailModel.findOneAndUpdate({ _id: req.body.iSystemEmailId }, UPDATE_QUERY)
            } catch (error) {
                console.log(error);
            }
        } else {
            try {
                const { vEmailCode, vEmailTitle, vFromName, vFromEmail, vCcEmail, vBccEmail, vEmailSubject, tEmailMessage, tInternalMessage, eStatus } = req.body

                const SystemEmail = new systemEmailModel({
                    vEmailCode,
                    vEmailTitle,
                    vFromName,
                    vFromEmail,
                    vCcEmail,
                    vBccEmail,
                    vEmailSubject,
                    tEmailMessage,
                    tInternalMessage,
                    eStatus
                });
                await SystemEmail.save();
                req.flash('success', 'System Email Create Successfully..!');
                return res.redirect('/system-email');
            } catch (error) {
                console.error(error);
                req.flash('error', 'Something Went Wrong');
                res.redirect('/system-email');
            }
        }

    }
};


exports.edit = async (req, res) => {

    var iSystemEmailId = req.params.iSystemEmailId;

    if (req.session.email) {
        try {
            var systemEmailData = await systemEmailModel.findOne({ _id: iSystemEmailId });
            is_layout = true;
            res.render("../view/systemEmail/add", {
                is_layout: is_layout,
                systemEmailData: systemEmailData
            });
        } catch (error) {
            console.log(error);
        }
    } else {
        res.redirect("/");
    }

};
