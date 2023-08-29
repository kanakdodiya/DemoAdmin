const SettingModel = require('../model/settingModel');
const path = require('path');
const location = path.join(__dirname + '/../');
const fs = require('fs');

exports.index = async (req, res) => {
    const data = await SettingModel.find();
    res.render("../view/setting/generalSetting", {is_layout: true, data: data[0]})
}

exports.emailSetting = async (req, res) => {
    const data = await SettingModel.find();
    res.render("../view/setting/emailSetting", {is_layout: true, data: data[0]})
}

exports.socialSetting = async (req, res) => {
    const data = await SettingModel.find();
    res.render("../view/setting/socialSetting", {is_layout: true, data: data[0]})
}

exports.companyInfo = async (req, res) => {
    const data = await SettingModel.find();
    res.render("../view/setting/companyInfo", {is_layout: true, data: data[0]})
}

exports.storeData = async (req, res) => {
    try{
     
        if(req.files){
           
            if(req.files.companyFavicon){
                const companyFavicon = req.files.companyFavicon;
                companyFavicon.mv(location + "upload/" + req.files.companyFavicon.name);
                var companyFaviconName = "";
                companyFaviconName = req.files.companyFavicon.name;
            }
            if(req.files.companyLogo){
                const companyLogo = req.files.companyLogo;
                companyLogo.mv(location + "upload/" + req.files.companyLogo.name);
                var companyLogoName = "";
                companyLogoName = req.files.companyLogo.name;
            }
            if(req.files.footerLogo){
                const footerLogo = req.files.footerLogo;
                footerLogo.mv(location + "upload/" + req.files.footerLogo.name);
                var footerLogoName = "";
                footerLogoName = req.files.footerLogo.name;
            }
        }
        const response = await SettingModel.find();

        const data = {
            vContrlPanelTitle: req.body.siteTitle,
            vMessageToDisplay: req.body.msgToBeDisplay,
            iItemPerPage: req.body.itemPerPage,
            vCompanyAddress: req.body.companyAddress,
            vCompanyDescription: req.body.companyDescription,
            vCompanyEmailId: req.body.companyEmail,
            vCompanyFavicon: companyFaviconName,
            vCompanyLogo: companyLogoName,
            vCompanyName: req.body.companyName,
            iCompanyNumber: req.body.companyNumber,
            vCompanyWebsite: req.body.companyWebsite,
            vCopyrightText: req.body.copyrightText,
            vFooterLogo: footerLogoName,
            vAdminEmailAddress: req.body.adminEmail,
            vEmailProtocol: req.body.emailProtocol,
            vSMTPServerHost: req.body.serverHost,
            vSMTPServerPassword: req.body.serverPass,
            iSMTPServerPort: req.body.serverPort,
            vSMTPServerUsername: req.body.serverUsername,
            vSupportEmail: req.body.supportEmail,
            vFacebookUrl: req.body.fbUrl,
            vInstagramUrl: req.body.instaUrl,
            vLinkedinUrl: req.body.linkedinUrl,
            vPinterestUrl: req.body.pinterestUrl,
            vTwitterUrl: req.body.twitterUrl,
            vYoutubeUrl: req.body.youtubeUrl,
        }

        if(response.length == 0){
            await new SettingModel(data).save();
        }else{
            await SettingModel.updateOne({_id: response[0]._id, $set: data})
        }
        req.flash("success","Data stored successfully!!")
        res.redirect('/dashboard');

    }catch(err){
        console.log(err)
    }
    
}
