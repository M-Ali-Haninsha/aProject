const express = require('express');
const router = express.Router();
const adminController  = require('../controller/adminController')
const jwtMiddleware = require('../middlewares/jwtToken')



router.post('/adminLogin', adminController.adminLoginSubmit)
router.put('/adminUserUpdate/:id',jwtMiddleware,  adminController.adminUpdateUser)
router.delete('/adminUserDelete/:id', adminController.adminDeleteUser)

module.exports = router;
