/* jshint esversion: 8 */
/* jshint node: true */

//dotenv
require('dotenv').config();
//db connection
const connectDB = require('./db/connect');
//model and schema
const cloth = require('./models/cloth');
//get json data
const jsonClothes = require('./clothes.json');
//start app and populate
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        await cloth.deleteMany();
        await cloth.create(jsonClothes);
        console.log('data deletion and population successful!');
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};
start();
