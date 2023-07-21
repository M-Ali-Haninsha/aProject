const { async } = require('rxjs');
const userModel = require('../model/userModel')
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

const signupSubmit = async (req, res) => {
  try {
    
    const check = await userModel.exists({
      email: req.body.email,
    });
    if (check) {
     res.status(200).json({"checked": true})
    } else {
        let userData = req.body
        const userDetail = userData;
      const { firstName, lastName, email, password } = userDetail;
      const hashpassword = await bcryptPassword(password);
      const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashpassword,
      };
      await userModel.insertMany([user]);
    }
    res.status(200).json()
  } catch (err) {
    res.status(500).json()
    console.log(err);
  }
};

const loginSubmit = async (req, res) => {
    try {
      const email = req.body.email;
      const password = req.body.password;
      const user = await userModel.findOne({ email: email });
      if (user) {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          const token = jwt.sign({ value: user }, secretKey, { expiresIn: '6000000' });
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

  const showUsers = async (req, res) => {
    try{
       const allUser =  await userModel.find();
       if(allUser){
        res.status(200).json({user: allUser})
       }
    }catch(err) {
        console.log(err);
    }
  }

  const userHomeDetails = async (req, res)=> {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        const decoded = jwt.verify(token, secretKey);
        const findvalue = await userModel.findOne({ email: decoded.value.email });
        res.status(200).json({ findvalue: findvalue });
  
    }catch(err) {

    }
  }

module.exports = {
    signupSubmit,
    loginSubmit,
    showUsers,
    userHomeDetails
}




        
