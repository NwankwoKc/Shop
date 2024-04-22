const express = require('express');
const app = express.Router();
const controller = require('../RouteController/authController');

// app.route('/').get().post();
app.route('/login').post(controller.login);
app.route('/signup').post(controller.sign);
app.route('/changeName').patch(controller.changeName);
app.route('/changePassword').patch(controller.changePassword);
app.route('/forgotPassword').patch(controller.forgotPassword);
app.route('/resetPassword/:token').patch(controller.resetPassword);

// app.route('/forgotpassword').post();

module.exports = app;