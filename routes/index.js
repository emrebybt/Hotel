var express = require('express');
var router = express.Router();



/* GET home page. */
router.get('/',(req, res, next) => {
  res.render('index', { title: 'Express' });
});




/* GET contact page. */
router.get('/contact', (req, res, next) => {
  res.render('contact', { title: 'İletişim' });
});




module.exports = router;
