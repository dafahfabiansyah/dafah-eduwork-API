const path = require('path');
const fs = require('fs');
const Product = require('./model');

const view = async (req, res) => {
  const { user_id, name, price, stock, status } = req.body;
  try {
    const product = await Product.find({ user_id, name, price, stock, status });
    res.send(product);
  } catch (e) {
    res.send(e);
  }
  //   _response(res);
};

module.exports = {
  //   store,
  view,
  // update,
  // destroy,
};
