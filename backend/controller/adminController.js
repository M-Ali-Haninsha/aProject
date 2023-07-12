const { async } = require('rxjs')
const userModel = require('../model/userModel')

const adminUpdateUser = async (req, res)=> {
    try {

        await userModel.updateOne({_id:req.body.id},{$set:{firstName:req.body.firstName,lastName:req.body.lastName, email:req.body.email}})
        res.status(200).json({update:'true'})
    }catch(error) {
        console.log(error);
    }
}

module.exports = {
    adminUpdateUser
}