const express = require('express');
const expresssession = require('express-session');

const User = require('../models/user');


exports.Register = (req, res, next) => {
    res.render('register', {title: 'Kayıt Ol'})
}


exports.postAddUser = (req, res, next) => {
    const name = req.body.name;
    const surname = req.body.surname;
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;

    const user = new User({
        name: name,
        surname: surname,
        username: username,
        email: email,
        password: password
    })

    user.save()
    .then(() => {
        console.log(user);
        res.redirect('/login');
    }).catch((err) => {
        console.log(err)
    })
}

exports.getLogin = (req, res, next) => {
    res.render('login', {
        title: 'Login'
    })
}

exports.postLogin= async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username, password: req.body.password })
        if (!user) {
          res.status(401).json({
            message: "Login not successful",
            error: "User not found",
          })
        } else {
          res.status(200);
          req.session.loggedIn= true;
          res.redirect('/');
        }
      } catch (error) {
        res.status(400).json({
          message: "An error occurred",
          error: error.message,
        })
      }
    }