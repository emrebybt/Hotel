const express = require('express');
const session = require('express-session');
const Rent = require('../models/rent');

exports.getDelete = (req, res, next) => {
    Rent.findByIdAndRemove({_id: req.params.id})
    .then(() => {
        res.redirect('/profile');
    })
}