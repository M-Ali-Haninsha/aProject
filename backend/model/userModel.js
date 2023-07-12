const mongoose=require('mongoose');

const userBaseSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true
    }, 
    lastName:{
        type:String,
        required:true
    } ,
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    } 
});

const userData=mongoose.model('userData', userBaseSchema);

module.exports = userData;