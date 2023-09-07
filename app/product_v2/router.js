const express = require('express');
const router = express.Router();
const Product = require('./model');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const upload = multer({ dest: 'uploads' });
const productControllerV2 = require('./controller');

// create
router.post('/product', upload.single('image'), async (req, res) => {
  const { user_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.create({ user_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
});

// read
router.get('/product/:id', async (req, res) => {
  const { user_id, name, price, stock, status } = req.body;
  try {
    const product = await Product.findAll({ user_id, name, price, stock, status });
    res.send(product);
  } catch (e) {
    res.send(e);
  }
});

// update
router.put('/product/:id', upload.single('image'), async (req, res) => {
  const { user_id, name, price, stock, status } = req.body;
  const image = req.file;

  try {
    if (image) {
      const target = path.join(__dirname, '../../uploads', image.originalname);
      fs.renameSync(image.path, target);

      const result = await Product.update({ user_id: parseInt(user_id), name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` }, { where: { id: req.params.id } });
      res.send(result);
    } else {
      const result = await Product.update(
        { user_id: parseInt(user_id), name, price, stock, status },
        {
          where: { id: req.params.id },
        }
      );
      res.send(result);
    }
  } catch (error) {
    res.send(error);
  }
});

// delete
router.delete('/product/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
