const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads' });
const router = express.Router();
const productController = require('./controller');
const { where } = require('sequelize');
const { error } = require('console');

router.get('/product', productController.index);
router.get('/product/:id', productController.view);
router.post('/product', upload.single('image'), productController.store);
router.put('/product/:id', upload.single('image'), productController.update);
router.delete('/product/:id', upload.single('image'), productController.destroy);

// router.get('/:category/:tag', (req, res) => {
//   const { category, tag } = req.params;
//   res.json({
//     category,
//     tag,
//   });
// });

// export default router;
module.exports = router;