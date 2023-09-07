const express = require('express');
const path = require('path');
const Productrouter = require('./app/product/router.js');
const ProductrouterV2 = require('./app/product_v2/router.js');
const logger = require('morgan');
const app = express();

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api/v1', Productrouter);
app.use('/api/v2', ProductrouterV2);
app.use((req, res, next) => {
  res.send({
    status: 'failed',
    message: 'message ' + req.originalUrl + ' Not Found',
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
