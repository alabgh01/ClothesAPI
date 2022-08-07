/* jshint esversion: 8 */
/* jshint node: true */

const notFound = (req, res) => {
    res.status(404).send('ERORR, route not found');
};

module.exports = notFound;