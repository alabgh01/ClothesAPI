/* jshint esversion: 8 */
/* jshint node: true */

const Cloth = require('../models/cloth');

const getAllItems  = async (req, res) => {
    //get the search params
    //featured: get only the featured items
    //clothType: get clothes of the types specified only
    //numeric: filter by price or rating
    //sort: sort items
    //fields: get only specified fields about the item
    const{description, featured, clothType, numeric, sort, fields} = req.query;
    //initiate the object that will contain the items added to the find query
    const queryObject = {};
    //check for description
    if(description) {
        queryObject.description = {$regex:description, $options:'i'};
    }
    //check for featured
    if(featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    //check for clothType
    if(clothType) {
        queryObject.clothType = {$regex:clothType, $options:'i'};
    }
    //check for numeric features
    if(numeric) {
        //map each user friendly operator to mongo syntax
        const operators = {
            '<':'$lt',
            '<=':'$lte',
            '=':'$eq',
            '>':'$gt',
            '>=':'$gte',
        }
        // regular expression
        const regEx = /\b(<|<=|=|>|>=)\b/g;
        //replace each operator the appears in 
        //the query that belongs to regEx by 
        //a mongo operator using the operator map
        let filters = numeric.replace(regEx, (match) => `-${operators[match]}-`);
        filters = filters.split(',').forEach((i) => {
            const [field, operator, value] = i.split('-');
            
            //check if they are for either price or rating
            if(field === 'price' | field === 'rating'){
                queryObject[field] = {[operator]:Number(value)};
            }
        });
    };
    //initiate find query
    let results = Cloth.find(queryObject);
    //check for sort
    if(sort) {
        const sortList = sort.split(',').join(' ');
        results = results.sort(sortList);
    }
    //check for fields
    if(fields) {
        const fieldList = fields.split(',').join(' ');
        results = results.select(fieldList);
    }
    //pages
    const page = Number(req.query.page) || 1;
    //limit per page
    const limit = Number(req.query.limit) || 6;
    //skip: to process what items will appear on pages later than first
    const skip = (page - 1) * limit
    //update results
    results = results.skip(skip).limit(limit);
    //finally await and get results
    const clothes = await results;
    //send results to the response
    res.status(200).json({msg:clothes, nbHits:clothes.length});
};
const getSingleItem  = async (req, res) => {
    ///item by id query
    const clothItem = await Cloth.findOne({_id:req.params.id});
    if (!clothItem) {
        throw new Error(`item of id ${req.params.id} not found`);
    }
    res.status(200).json({clothItem});
};
const addSingleItem  = async (req, res) => {
    const clothItem = await Cloth.create(req.body);
    res.status(200).json({clothItem});
};
const deleteSingleItem  = async (req, res) => {
    //query item by id and delete
    //get the id from req.params
    const clothItem = await Cloth.findOneAndDelete({_id:req.params.id});
    if(!clothItem){
        throw new Error(`item of id ${req.params.id} not found`);
    }
    res.status(200).json({cloth: null, status: 'success'});
};
const updateSingleItem  = async (req, res) => {
    const clothItem = await Cloth.findByIdAndUpdate(
        {_id:req.params.id},
        req.body,
        {new:true, runValidators:true},
        );
    if (!clothItem) {
        throw new Error(`item with id ${id} not found`);
    }
    res.status(200).json({clothItem});
};

module.exports = {
    getAllItems,
    getSingleItem,
    addSingleItem,
    updateSingleItem,
    deleteSingleItem,
};
