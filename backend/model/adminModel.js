const mongoose = require('mongoose')

const adminBaseSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    } 
});

const adminData=mongoose.model('adminData', adminBaseSchema);

module.exports = adminData;