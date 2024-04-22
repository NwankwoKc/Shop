const express = require('express');
const app = express.Router();
const controller = require('../RouteController/userController');
const upload = require('../Utility/multer');
app.route('/').get(controller.get);
app.route('/:id').get(controller.getSpecific);
app.route('/update/:id').patch(upload.single('photo'),controller.update);

//cart routes
// app.route('/cart/:id').get(controller.getSpecificCart);
// app.route('/cart').get(controller.getCart).post(controller.postCart).delete(controller.deleteCart);
module.exports = app;