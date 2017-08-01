const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//var env = process.env.NODE_ENV || 'development';

mongoose.connect('mongodb://localhost:27017/Vogue');

module.exports = {mongoose};
