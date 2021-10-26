var Products = require('../models/products');
const { body,validationResult } = require("express-validator");

var async = require('async');

exports.index = function(req, res) {

    async.parallel({
        products_count: function(callback) {
            Products.countDocuments({},callback);
        },
        
    }, function(err, results) {
        res.render('index', { title: 'Error', error: err, data: results });
    });
};


// Display list of all books.
exports.products_list = function(req, res, next) {
 
  Products .find({}, 'products_id')
    .populate('product_name').exec(function (err, list_products) {
      if (err) {return next(err)} 
      else {
            // Successful, so render
            res.render('products_list', {title: 'Products List', products_list:  list_products});
        }
    });

};

// Display detail page for a specific book.
exports.products_detail = function(req, res, next) {

    async.parallel({
        products: function(callback) {

            Products.findById(req.params.id)
              .populate('product_name')
              .populate('seller_id').populate(type)
              .exec(callback);
        }
         products_instance: function(callback) {

          ProductInstance.find({ 'book': req.params.id })
          .exec(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        if (results.products==null) { // No results.
            var err = new Error('Product not found');
            err.status = 404;
            return next(err);
        }
        // Successful, so render.
        res.render('products_detail', { title: results.products.title, product:  results.product, products_instances: results.products_instance } );
    });

};


