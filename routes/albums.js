const express = require('express');
const router = express.Router();

let data = require('../data/albums.json');

// console.log(data);

let albums = data.albums

router.get('/albums', (req, res) => {

    let albumArr = []

    albums.forEach(albumObj =>{
        albumArr = albumArr.concat(albumObj)
    })

    // console.log(albumArr);

    res.render('albums', {
        albumArr: albumArr
    })
})

router.get('/albums/:id', (req, res) => {
    
    let id = req.params.id

    let albumObjArr = []

    albums.forEach(albumObj =>{
        if(albumObj.shortname == id){
            albumObjArr.push(albumObj)
        }
    })

    console.log(albumObjArr);

    res.render('specific-album', {
        album: albumObjArr //[{name, short}]
    })
})

module.exports = router