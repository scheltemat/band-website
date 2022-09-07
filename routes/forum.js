const express = require('express');
const router = express.Router();

const fs = require('fs'); 

const data = require('../data/forum.json');

let comments = data.comments

router.get('/forum', (req, res) => {
    
    res.render('forum')
})

router.get('/api', (req, res) => {

    res.json(comments)
})

// submit an new message
router.post('/api', (req, res) => {
    // get data off of the header
    let {name, message} = req.body;

    //push obj data to beginning of array
    comments.unshift(req.body);

    fs.writeFile('data/forum.json', JSON.stringify(data), 'utf8', err=>{
        if(err){
            res.status(404).send(err)
        }
    })

    //send back all of the messages with the new message attached
    res.json(comments)
})

module.exports = router