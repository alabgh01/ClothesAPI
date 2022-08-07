/* jshint esversion: 8 */
/* jshint node: true */

//get mongoose
const mongoose = require('mongoose');

//specify data modeling and characteristics
const clothSchecma = new mongoose.Schema({
    description:{
        type:String,
        required:[true, 'Item description must be provided'],
    },
    price:{
        type:Number,
        required:[true, 'Item price must be provided'],
    },
    rating:{
        type:Number,
        default:0,
    },
    featured:{
        type:Boolean,
        default:false,
    },
    colors:{
        type:Array,
        required:[true, 'item colors available must be provided'],
    },
    clothType:{
        type:String,
        enum:{
            values:['shirt', 'pants', 'dress', 'sweater', 'shorts'],
            message:'{VALUE} is not supported',
        },
        required:[true, 'item type must be provided'],
    },
    //figure put how to work with images in mongo and node
    // image:{},
});

module.exports = mongoose.model('Cloth', clothSchecma);
