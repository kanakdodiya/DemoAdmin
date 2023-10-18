const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

const Messages = new mongoose.Schema({
    senderUserId: {
        type: ObjectId
    },
    groupId: {
        type: ObjectId
    },
    content: {
        type: String
    }
});

const chatData = mongoose.model('messages', Messages);

module.exports = chatData;