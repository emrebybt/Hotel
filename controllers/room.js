const express = require('express');
const session = require('express-session');
const Room = require('../models/room');

exports.GetRooms = (req, res, next) => {
    if(req.session.loggedIn)
    {
        Room.find()
        .then(rooms => {
            res.render('rooms', {
                title: 'Odalar',
                rooms: rooms,
                user: req.session.user
            })
        }).catch((err) => {
            console.log(err)
        })
}
else{
    res.redirect('/login')
}
}


exports.postRooms = (req, res , next) => {
    console.log(req.body);
    var date = req.body.startDate;
    console.log(new Date(req.body.startDate)); 
}