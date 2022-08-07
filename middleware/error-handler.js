/* jshint esversion: 8 */
/* jshint node: true */

const errorHandlerMiddleware = async (err, req, res, next) => {
    console.log(err);
    return res.status(500).json({msg: 'Something went wrong! Please try again.'});
};

module.exports = errorHandlerMiddleware;