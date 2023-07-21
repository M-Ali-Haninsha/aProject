const { async } = require('rxjs')
const userModel = require('../model/userModel')
const adminModel = require('../model/adminModel')
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secretKey = 'your-secret-key';


const bcryptPassword = async (password) => {
    try {
      const hashpassword = await bcrypt.hash(password, 10);
      return hashpassword;
    } catch (err) {
      console.log(err);
    }
  };

const adminLoginSubmit = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const admin = await adminModel.findOne({ email: email });
      if (admin) {
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (passwordMatch) {
          const token = jwt.sign({ value: admin }, secretKey, { expiresIn: '6000000' });
         res.status(200).json({msg:'passMatched', token})

          } else {
            res.status(200).json({msg:'passwordWrong'})
          }
        } else {
            res.status(200).json({msg:'wrongEmail'})
        }
    } catch (err) {
      console.log(err);
    }
  };


const adminUpdateUser = async (req, res)=> {
    try {
        await userModel.updateOne({_id:req.params.id},{$set:{firstName:req.body.firstName,lastName:req.body.lastName, email:req.body.email}})
        res.status(200).json({"update": true})
    }catch(error) {
        console.log(error);
    }
}

const adminDeleteUser = async(req, res)=> {
    try {
        await userModel.deleteOne({_id:req.params.id})
       
            res.status(200).json({msg:'deleted'})

    }catch(err) {
        console.log(err);
    }
}

module.exports = {
    adminUpdateUser,
    adminDeleteUser,
    adminLoginSubmit
}