const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')
const jwtMiddleware = require('../middlewares/jwtToken')


router.get('/getUser',jwtMiddleware, userController.showUsers)

router.get('/userHomeData', jwtMiddleware, userController.userHomeDetails)

router.post('/signUp', userController.signupSubmit)

router.post('/', userController.loginSubmit)



module.exports = router;
