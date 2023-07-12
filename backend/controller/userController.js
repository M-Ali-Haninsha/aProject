const { async } = require('rxjs');
const userModel = require('../model/userModel')
const bcrypt = require("bcrypt");


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
         res.status(200).json({msg:'passMatched'})
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
       console.log(allUser);
       if(allUser){
        res.status(200).json({user: allUser})
       }
    }catch(err) {
        console.log(err);
    }
  }

module.exports = {
    signupSubmit,
    loginSubmit,
    showUsers
}