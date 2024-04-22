const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const product = require('./products');
const signup = new mongoose.Schema({
    Name:{
        type:String,
        required:true,
        unique:true
    },
    Email:{
        type:String,
        unique:true
    },
    Password:{
        type:String,
        required:true,
        unique:true,
        max:6
    },
    ConfirmPassword:{
        type:String,
        max:6
    },
    SessionId:{
        type:String
    },
    PhoneNumber:{
        type:Number,
        unique:true
    },
    Emailtemporary:{
        type:String,
    },
    ProfileImgae:{
        type:String,
    },
    cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    }]
})

signup.pre('save', async function(next){
    try{
        if(this.Password != this.ConfirmPassword){
            next(Error);
        }
       const hashPass =  await bcrypt.hash(this.Password,10);
       const hashConfirm = await bcrypt.hash(this.ConfirmPassword,10);
       this.Password = hashPass;
       this.ConfirmPassword = hashConfirm;
    }catch{
        const error = new Error('Passwords do not correlate');
        error.statusCode = 400;
        next(Error)
    }
})

const signupModel = mongoose.model('Client',signup);

module.exports = signupModel;