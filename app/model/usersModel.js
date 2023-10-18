const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    vUserName: {
        type: String,
        required: true,
        unique: true 
    },
    vEmail: {
        type: String,
        required: true,
        unique: true 
    },
    iContact: {
        type: String,
        required: true,
        unique: true 
    },
    vAvatar: {
        type: String
    },
    eStatus:{
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    eOnline: {
        type: String,
        default: '0'
    }
});

const UserData = mongoose.model('users', UserSchema);

module.exports = UserData;