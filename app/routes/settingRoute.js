const { Router } = require('express');

module.exports = (app) =>{
    const router = require('express').Router();
    const SettingController = require('../controller/settingController');

    router.get('/setting', SettingController.index);
    router.get('/email-setting', SettingController.emailSetting);
    router.get('/social-setting', SettingController.socialSetting);
    router.get('/company-info', SettingController.companyInfo);
    router.post('/store-data', SettingController.storeData);


    app.use('/general-setting', router)
}