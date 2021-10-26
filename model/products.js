var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
    product_name: {type: String, required: true},
    product_id: { type: Schema.ObjectId,required: true },
    seller_id: {type: String, required: true},
    cost: {type: String, required: true},
    type: [{ type: String, required:true }]
});


productSchema
.virtual('url')
.get(function () {
  return '/product/'+this._id;
});

module.exports = mongoose.model('Products', productSchema);
