const path = require('path');
const fs = require('fs');
const connection = require('../../config/sequelize');
const { search } = require('./router');
const { exec } = require('child_process');

// create
const store = async (req, res) => {
  try {
    const { user_id, name, price, stock, status } = req.body;
    const image = req.file;
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    await Product.sync();
    const result = await Product.create({ user_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` });
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

// read
const view = async (req, res) => {
  const { user_id, name, price, stock, status } = req.body;
  try {
    const product = await Product.findAll({ user_id, name, price, stock, status });
    res.send(product);
  } catch (e) {
    res.send(e);
  }
  _response(res);
};

const _response = (res) => {
  return (error, result) => {
    if (error) {
      console.log(error);
      res.send({
        status: 'failed',
        response: error,
      });
    } else {
      res.send({
        status: 'success',
        response: result,
      });
    }
  };
};

module.exports = {
  store,
  view,
  // update,
  // destroy,
};
