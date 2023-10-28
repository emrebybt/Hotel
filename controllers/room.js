const express = require('express');
const session = require('express-session');
const Room = require('../models/room');
const Rent = require('../models/rent');

exports.GetRooms = (req, res, next) => {
    if (req.session.loggedIn) {
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
    else {
        res.redirect('/login')
    }
}


exports.postRooms = (req, res, next) => {
    console.log(req.body);
    console.log(new Date(req.body.startDate));
}


exports.getBookRoom = (req, res, next) => {

    Room.findOne({ _id: req.params.id })
        .then(room => {
            console.log(room);
            res.render('book', {
                title: 'Rezervasyon işlemi',
                room: room
            })
        }).catch((err) => {
            console.log(err)
        })
}


exports.postBookRoom=(req,res)=>{
    const { startDate, endDate, adult, id } = req.body;
    const startdate = new Date(startDate);
    const enddate = new Date(endDate);
    const dayDiff = Math.ceil(Math.abs(enddate - startdate) / (1000 * 3600 * 24));
 
 
    Rent.find({ roomId: id })
    .then(rents => {
      let isRoomAvailable = true; // Oda müsaitlik durumu kontrolü
 
      for (const rent of rents) {
        const rentStartDate = new Date(rent.startDate);
        const rentEndDate = new Date(rent.endDate);
         if(rentEndDate>Date.now){
             console.log("eski tarih");
             continue;
 
         }
        if (startdate >= rentEndDate || enddate <= rentStartDate) {
          // Odanın bu tarih aralığında müsait olduğu
          console.log("Oda müsait.");
        } else {
          // Odanın bu tarih aralığında dolu olduğu
          isRoomAvailable = false;
          console.log("Oda Dolu.");
          break; // Oda dolu ise döngüyü sonlandır
        }
      }
 
      if (isRoomAvailable) {
 
    Room.findOne({_id:id})
    .then((room) => {
        const rent = new Rent({
            startDate: startdate,
            endDate: enddate,
            roomId: id,
            userId:req.session.user._id,
            price: room.price,
            adult: adult,
            totalPrice: dayDiff * room.price * adult
        })
        rent.save()
            .then(() => {
                res.redirect('/')
            })
    }).catch((err) => {
        console.log(err);
    })

 
      } else {
        // Oda dolu ise hata mesajı ile sayfayı render edin
        Room.findOne({ _id: id })
        .then((room => {
            res.render('book', { room: room, error: 'Bu tarihlerde oda müsait değil' });
        }))
        
      }
    })
    .catch(err => {
      console.error(err);
    });
 };