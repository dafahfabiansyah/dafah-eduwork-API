const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'field harus di isi'],
    minLength: 3,
    maxLength: 25,
  },
  price: {
    type: Number,
    required: true,
    minLength: 1000,
    maxLength: 100000,
  },
  stock: Number,
  status: {
    type: Boolean,
    default: true,
  },
  image_url: {
    type: String,
  },
});

const productModel = mongoose.model('Product', productSchema);
module.exports = productModel;
