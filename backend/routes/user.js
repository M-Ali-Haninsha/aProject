const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/getUser', userController.showUsers)

router.post('/signUp', userController.signupSubmit)

router.post('/', userController.loginSubmit)

module.exports = router;
