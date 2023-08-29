const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    id: {
        type: String
    },
    vUserName: {
        type: String,
        required: true
    },
    vEmail: {
        type: String,
        required: true
    },
    iContact: {
        type: Number,
        required: true
    },
    vAvatar: {
        type: String
    },
    eStatus:{
        type: String,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    }
   
});

const UserData = mongoose.model('users', UserSchema);

module.exports = UserData;