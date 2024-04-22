const express = require('express');
const app = express();
const globalerror = require('./Utility/globalErrorHandler');
const errorConstructor = require('./Utility/errorConstructor');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');
//Routes
const mainRoute = require('./Route/main');
const authentication = require('./Route/authentication');
const userRoute = require('./Route/user');
const cart = require('./Route/cart');
//middlewares
app.use(session({
   secret:'plmoknijbihv',
   resave:false,
   saveUninitialized:true,
   cookie:{
      secure:true,
      maxAge:60 * 24 * 60 * 60 * 1000 
   }
}))
app.use(express.json());
app.use(cors());
app.use(cookieParser());


app.use('/',mainRoute);
app.use('/auth',authentication);
app.use('/user',userRoute); 
app.use('/user/cart',cart);
//ErrorHandling middle ware
app.use(globalerror);

app.use('*',()=>{
   const error = new Error('no route found');
   error.statusCode = 500;
    
})

module.exports = app;