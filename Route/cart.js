const express = require('express');
const app = express.Router();
const cartController = require('../RouteController/cartController');
app.route('/:id').post(cartController.posting);
app.route('/:id').delete(cartController.deleteing);
module.exports = app;


