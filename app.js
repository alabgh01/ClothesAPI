/* jshint esversion: 8 */
/* jshint node: true */

//activate dotenv
require('dotenv').config();
//async errors
require('express-async-errors');
//express app
const express = require('express');
const app = express();
//router
const router = require('./routes/clothes')
//error requires
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
//connect to DB
const connectDB = require('./db/connect');

//middleware
app.use(express.json());

//serve startic??

//routes test
app.get('/', (req, res) => {
    res.status(200).json({msg:'hello page'});
});

//clothes routes
app.use('/api/v1/clothes', router)

//error middleware MUST BE PLACED AFTER ROUTES
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

// //launch app listening normal 
// app.listen(port, () => {
//     console.log(`app listening on port ${port}`);
// });

//start app with db
const start = async () => {
    try {
        //connect to DB
        // NEED TO RUN POPULATE.JS FIRST?
        // NO NEED TO CREATE IT ON MONGODB WEBSITE
        await connectDB(process.env.MONGO_URI);
        app.listen(port, 
            console.log(`server is listening on port ${port} ...`));
    } catch (error) {
        console.log(error);
    }
};

start();