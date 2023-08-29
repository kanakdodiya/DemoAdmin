const mongoose = require("mongoose");

const SystemEmailSchema = mongoose.Schema({
    vEmailCode: {
        type: String,
        required: true,
    },
    vEmailTitle: {
        type: String,
        required: true,
    },
    vFromName: {
        type: String,
        required: true,
    },
    vFromEmail: {
        type: String,
        required: true,
    },
    vCcEmail: {
        type: String,
        required: true,
    },
    vBccEmail: {
        type: String,
        required: true,
    },
    vEmailSubject: {
        type: String,
        required: true,
    },
    tEmailMessage: {
        type: String,
        required: true,
    },
    eStatus: {
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active',
        required: true,
    },
});

module.exports = mongoose.model("system_email", SystemEmailSchema);