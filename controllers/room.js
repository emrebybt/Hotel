const express = require('express');

const Room = require('../models/room');

exports.GetRooms = (req, res, next) => {
    Room.find()
    .then(rooms => {
        res.render('rooms', {
            title: 'Odalar',
            rooms: rooms
        })
    }).catch((err) => {
        console.log(err)
    })
}


exports.postRooms = (req, res , next) => {
    console.log(req.body);
    var date = req.body.startDate;
    console.log(new Date(req.body.startDate)); 
}