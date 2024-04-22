const app = require('./express');
const port = process.env.PORT||2000;
const dotenv = require('dotenv');
dotenv.config({path:'./config.env'})
const mongoose = require('mongoose');
const uri = "mongodb+srv://nkelechi21:RS1HUiAbzdOIMmXH@cluster0.l2lh2qb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Connected to mongodb');
    app.listen(port,()=>{
        console.log('server ready');
    })
}).catch((error)=>{
    console.error(error);
})