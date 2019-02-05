const mongoose = require('mongoose');

const ChatSchema = mongoose.Schema({
    id:{
        type: Number,
        required: true
    },
    name:{
        type: String,
        required: true
    },
    topic:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: false
    },
    message:{
        type: String,
        required: true
    },
})

const Chat = module.exports = mongoose.model('Chat', ChatSchema);