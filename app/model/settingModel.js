const mongoose = require('mongoose');

const SettingSchema = mongoose.Schema({
    vContrlPanelTitle: {
        type: String
    },
    vMessageToDisplay: {
        type: String
    },
    iItemPerPage: {
        type: Number
    },
    vCompanyAddress: {
        type: String
    },
    vCompanyDescription: {
        type: String
    },
    vCompanyEmailId: {
        type: String
    },
    vCompanyFavicon: {
        type: String
    },
    vCompanyLogo: {
        type: String
    },
    vCompanyName: {
        type: String
    },
    iCompanyNumber: {
        type: Number
    },
    vCompanyWebsite: {
        type: String
    },
    vCopyrightText: {
        type: String
    },
    vFooterLogo: {
        type: String
    },
    vAdminEmailAddress: {
        type: String
    },
    vEmailProtocol: {
        type: String
    },
    vSMTPServerHost: {
        type: String
    },
    vSMTPServerPassword: {
        type: String
    },
    iSMTPServerPort: {
        type: String
    },
    vSMTPServerUsername: {
        type: String
    },
    vSupportEmail: {
        type: String
    },
    vFacebookUrl: {
        type: String
    },
    vInstagramUrl: {
        type: String
    },
    vLinkedinUrl: {
        type: String
    },
    vPinterestUrl: {
        type: String
    },
    vTwitterUrl:{
        type: String
    },
    vYoutubeUrl: {
        type: String
    }

});

module.exports = mongoose.model('settings', SettingSchema);