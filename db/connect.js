/* jshint esversion: 8 */
/* jshint node: true */

const mongoose = require('mongoose');

const connectDB = (url) => {
    return mongoose.connect(url);
};

module.exports = connectDB;