const express = require('express');
const router = express.Router();

const Chat = require('../models/appusers');

//retrieving messages
router.get('/chat', (req, res, next)=>{
    Chat.find(function(err, appusers){
        res.json(appusers)
    })
});


//add messages
router.post('/chat', (req, res, next)=>{
    let newChat = new Chat({
        id: req.body.id,
        name: req.body.name,
        topic: req.body.topic,
        email: req.body.email,
        message: req.body.message
    });

    newChat.save((err, chat)=>{
        if(err)
        {
            res.json({msg: 'Failed to add message'});
        }
        else{
            res.json({msg: "Message added successfully"});
        }
    });
});


module.exports = router;