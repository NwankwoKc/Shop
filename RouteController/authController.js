const errorConstructor = require('../Utility/errorConstructor');
const signupModel = require('../Model/signup');
const factoryFunction = require('../Utility/utility');
const { findOne } = require('../Model/products');
const {confirmingPassword} = require('../Utility/ComparePass');
const express = require('express');
const crypto = require('crypto');
const email = require('../Utility/email');
const app = express();

//signup
exports.sign = async (req,res,next) =>{
    try{
        const data = await signupModel.create(req.body)
        console.log(data)
        const sessionid = req.sessionID;
        const upData = {SessionId:sessionid};
        //saving it to the database
        const svDatabase = await signupModel.findByIdAndUpdate(data.id,upData,{
            new:true
        })
        res.status(200).cookie('sessionId',sessionid).json({
            status:'success'
        })
    }catch{
        console.log('error')
    }
}
//Getting everyone that has signed up
exports.getting = factoryFunction.getting(signupModel);
//Login
exports.login = async (req,res,next)=>{
    try{
        const password = req.body.Password;
        const name = req.body.Name;
        console.log(password,name)
        //check if name and password have been inputed
        if(!password || !name){
            const error = new Error('No name or Password');
            error.statusCode = 400;
            next(error);
        }
        console.log("passed there is name and password")
        // check if name is in the database
        const checkName = await signupModel.findOne({Name:name});
        console.log(req.body)
        //if name is in the database then it should compare passwords
        const checkPass = confirmingPassword(password,signupModel);
        const ans = await checkPass;
        if(!checkName || ans === false){
            const error = new Error('Password Incorrect');
            error.statusCode = 400;
            next(error);
        }
        const sessionid = req.sessionID;
        const updateData = { SessionId: sessionid };
        //saving saving the sessionId to the database
        const upDate = await signupModel.findByIdAndUpdate(checkName.id,updateData,{
            new:true
        })
        res.status(200).cookie('sessionId',sessionid).json({
            status:'success',
        })
    }catch{
        next()
    }
}
//checking sessions 
exports.sessionCheck = async (req,res,next)=>{
    const cookieValue = req.cookies.sessionId;
    console.log(cookieValue);
    if(cookieValue===undefined){
        const error = new Error('Your session has expired');
        error.statusCode = 400;
    }
    const checkName = await signupModel.findOne({SessionId:cookieValue});
    if(!checkName){
        const error = new Error('you have not loged in');
        error.statusCode = 400;
    }
    const date = new Date();
    console.log(date);
    next()
}

//changing name
exports.changeName = async (req,res,next)=>{
    try{
        console.log("working")
        const sessionid = req.cookies.sessionId;
        const user = await signupModel.findOne({SessionId:sessionid});
        console.log("user exist");
        const name = req.body.Name;
        console.log(name);
        const findName = await signupModel.findOne({Name:name});
        if(!findName){
            console.log('no name')
            return 'no name'
        }
        console.log(findName.id)
        const newNames = req.body.NewName;
        console.log(newNames);
        const updateData = { Name: newNames };
        console.log(updateData)
        const upDate = await signupModel.findByIdAndUpdate(findName.id,updateData,{
            new:true
        })
        res.status(200).json({
            status:'success',
            data:'complete'
        })
    }catch{
        next(Error)
    }
}

//changing password
exports.changePassword = async (req,res,next)=>{
    try{
        const password = req.body.Password;
        const newPassword = req.body.Newpassword;
        const checkpass = await signupModel.findOne({Password:password});
        if(!checkpass){
            const error = new Error('No such password')
            error.status = 400
        }
        const updateData = {Password:password}
        const upDate = await signupModel.findByIdAndUpdate(checkpass.id,updateData,{
            new:true
        })
        console.log('success')
        res.status(200).json({
            status:200,
            data:'success'
        })
    }catch{
        next(Error)
    }
}

exports.forgotPassword = async (req,res,next)=>{
    try{
        const name = req.body.Name;
        const personsemail = req.body.Email;
        const fOne = await signupModel.findOne({Email:email});
        if(!fOne){
            const error = new Error('Email does not exist')
            error.status = 400
        }
        console.log('email exist')
        //generating 4random numbers
        let mainNumber ='';
        
        for(let i = 0 ; i < 4; i++){
            const rd = Math.floor(Math.random() * 10);
            const srd = rd.toString()
            mainNumber = mainNumber + srd
        }
        //const emailData = await email.sendEmail(personsemail,"SecretCode",mainNumber);
        res.cookie("emailName",personsemail);
        res.status(200).cookie("emailId",mainNumber).json({
            status:"success"
        })
    }catch{
        next(Error)
    }
}

exports.resetPassword = async (req,res,next) =>{
    try{
       
        let linkid = req.params.token;
        let emailid = req.cookies.emailId;
        if(linkid != emailid){
            console.log("invalid emailId")
            return false
        }
        let data = await signupModel.findOne({Email:req.cookies.emailName});
        console.log("there is something like that",data.id);
    }catch{
        next(Error)
    }
}