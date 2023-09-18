const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const router = express.Router();
const db = require('../../config/mongodb');

router.get('/product', (req, res) => {
  db.collection('product')
    .find()
    .toArray()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
});

module.exports = router;
