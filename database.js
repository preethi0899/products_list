
console.log('This script populates products to your database. Specified database as argument - e.g.: database mongodb+srv://preethi:mongo123$@cluster0.egueg.mongodb.net/test?retryWrites=true&w=majority');


var userArgs = process.argv.slice(2);

var async = require('async')
var Products = require('./models/products') 

var mongoose = require('mongoose');
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var products = []
var products_instances = []


function productCreate() {
  products_details = { 
   product_name=product_name,
   product_id=product_id,
   seller_id=seller_id,
   cost=cost,
   type=type
  }
    
  var product = new Products(bookdetail);    
  product.save(function (err) {
    if (err) {
      cb(err, null)
      return
    }
    console.log('New Product: ' + product);
    products.push(product)
    cb(null, product)
  }  );
}


function createProducts(cb) {
    async.parallel([
        function(callback) {
          createProducts('Fridge','178976','098752','20000','Kitchen',, callback);
        },
        function(callback) {
          createProducts('Sunscreen','178977','089653','2000','Health and SkinCare', callback);
        },
        function(callback) {
          createProducts('Olive oil','178978','054361','1000','Kitchen', callback);
        },
        function(callback) {
         createProducts('Washing Machine','178979','078190','30000','Laundry', callback);
        },
        function(callback) {
         createProducts('Sofa','178980','017650','50000','Living room', callback);
        }
        ],
        // optional callback
        cb);
}

mongoose.connection.close();




