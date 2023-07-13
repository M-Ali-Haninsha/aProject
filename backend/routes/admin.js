const express = require('express');
const router = express.Router();
const adminController  = require('../controller/adminController')
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/adminUserUpdate/:_id', adminController.adminUpdateUser)
router.post('/adminUserDelete/:_id', adminController.adminDeleteUser)

module.exports = router;
