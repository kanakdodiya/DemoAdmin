const mongoose = require('mongoose');

const ChatMembers = new mongoose.Schema({
    groupName: {
        type: String
    },
    groupMembers: {
        type: Array
    },

});

const chatMembersData = mongoose.model('chat_members', ChatMembers);

module.exports = chatMembersData;