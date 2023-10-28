const express = require('express');
const router = express.Router();

const rentController = require('../controllers/rent');


router.get('/delete/:id',rentController.getDelete);


module.exports = router;

