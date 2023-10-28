const express = require('express');
const router = express.Router();

const authController = require('../controllers/auth');

/* GET login page. */
router.get('/register',authController.Register);

router.post('/register', authController.postAddUser);

router.get('/login', authController.getLogin)

router.post('/login', authController.postLogin)

router.get('/logout' , authController.getLogout)

module.exports = router;

