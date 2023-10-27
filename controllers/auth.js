const express = require('express');
const session = require('express-session');

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

exports.postLogin= (req, res, next) => {
const user = User.findOne({ username: req.body.username, password: req.body.password })
  .then((user) => {
  if (!user) {
    res.status(401).json({
      message: "Login not successful",
      error: "User not found",
    })
  } else {
    res.status(200);
    req.session.user = user;
    req.session.loggedIn= true;
    res.redirect('/');
  }
})
.catch ((err) => {
  console.log(err);
})}


