const express = require('express');
const router = express.Router();
const roomController = require('../controllers/room');

/* GET rooms page. */
router.get('/rooms', roomController.GetRooms)
  
router.post('/rooms', roomController.postRooms)






module.exports = router;