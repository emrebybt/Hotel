const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const Rent = require('../models/rent');



exports.Register = (req, res, next) => {
    res.render('register', {title: 'Kayıt Ol'})
}


exports.postAddUser = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        console.log("Şifre hashleme hatası");
        return next(err);
      }
    
    const user = new User({
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        email: req.body.email,
        password: hash
    })

    user.save()
    .then(() => {
        console.log(user);
        res.redirect('/login');
    }).catch((err) => {
        console.log(err)
    })
  })
}

exports.getLogin = (req, res, next) => {
    res.render('login', {
        title: 'Login'
    })
}

exports.postLogin= (req, res, next) => {
const user = User.findOne({ username: req.body.username})
  .then((user) => {
  if (!user) {
    res.render('login', {error: 'Kullanıcı adı veya şifre yanlış'})
  } else {
    bcrypt.compare(req.body.password, user.password)
    .then((result => {
      if (result){
        req.session.user = user;
        req.session.loggedIn= true;
        res.redirect('/');
      }
      else {
        res.render('login', {error: 'Kullanıcı adı veya şifre yanlış'})
      }
    }))
  }
})
.catch ((err) => {
  console.log(err);
})}

exports.getLogout = (req, res, next) => {
  req.session.destroy();
  res.redirect('/');
}

exports.getProfile = (req, res, next) => {
  Rent.find({userId : req.session.user._id})
  .populate('roomId')
  .then((rents) => {
    console.log(rents);
    res.render('profile', {
      title: 'Profil Sayfası',
      rents: rents
    })
  })
  
}