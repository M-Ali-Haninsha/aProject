const { async } = require('rxjs')
const userModel = require('../model/userModel')

const adminUpdateUser = async (req, res)=> {
    try {
        console.log("keriiii");
        await userModel.updateOne({_id:req.params.id},{$set:{firstName:req.body.firstName,lastName:req.body.lastName, email:req.body.email}})
        res.status(200).json({"update": true})
    }catch(error) {
        console.log(error);
    }
}

const adminDeleteUser = async(req, res)=> {
    try {
        const deleted = await userModel.deleteOne({_id:req.query.id})
        if(deleted) {
            res.status(200).json({msg:'deleted'})
        }

    }catch(err) {
        console.log(err);
    }
}

module.exports = {
    adminUpdateUser,
    adminDeleteUser
}