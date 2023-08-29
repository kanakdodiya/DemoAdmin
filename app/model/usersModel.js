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
        type: Number,
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
    }
   
});

const UserData = mongoose.model('users', UserSchema);

module.exports = UserData;