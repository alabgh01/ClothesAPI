/* jshint esversion: 8 */
/* jshint node: true */

const express = require('express');
const router = express.Router();
//controllers
const {
    getAllItems,
    getSingleItem,
    addSingleItem,
    updateSingleItem,
    deleteSingleItem,
} = require('../controllers/clothes');

//routs:
//get all clothes (with filtering options)
//get a single clothes
//add a clothes item
//edit a cloth item
//delete a cloth item

//base route: /api/v1/clothes/

router.route('/')
.get(getAllItems).post(addSingleItem);

router.route('/:id')
.get(getSingleItem).patch(updateSingleItem).delete(deleteSingleItem);

module.exports = router;