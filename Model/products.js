const mongoose = require('mongoose');
const product = new mongoose.Schema({
    Name:{
        type:String,
        required:true
    },
    Price:{
        type:Number,
        require:true
    },
    Rating:{
        type:Number
    },
    NumberinStock:{
        type:Number,
        required:true
    }
})

const prod = mongoose.model('product',product);
module.exports = prod;