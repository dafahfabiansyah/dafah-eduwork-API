const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
exports.upload = upload;
const router = express.Router();
exports.router = router;
const Product = require('./model');
const path = require('path');
const fs = require('fs');
const res = require('express/lib/response');
const productController = require('./controller');

// router.get('/product', productController.index);
// router.get('/product/:id', productController.view);

// create
router.post('/product', upload.single('image'), (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads/MongoDB', image.originalname);
    fs.renameSync(image.path, target);
    Product.create({ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
});

//read
router.get('/product', upload.single('image'), (req, res) => {
  Product.find()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

// update
router.put('/product/:id', upload.single('image'), async (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads/MongoDB', image.originalname);
    fs.renameSync(image.path, target);
    // await db
    //   .collection('product')
    //   .updateOne({ _id: req.params.id }, { name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` })
    //   .then((result) => res.send(result))
    //   .catch((error) => res.send(error));
    try {
      Product.findOneAndUpdate({ _id: req.params.id }, { $set: { name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` } });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
});

// delete
router.delete('/product/:id', (req, res) => {
  const id = req.params.id;
  deleteOne({ _id: new ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

module.exports = router;
