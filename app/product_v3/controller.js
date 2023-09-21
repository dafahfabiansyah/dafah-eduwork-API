const { ObjectId } = require('mongodb');
const db = require('../../config/mongodb');
const path = require('path');
const fs = require('fs');

const index = (req, res) => {
  db.collection('product')
    .find()
    .toArray()
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

// read
const view = (req, res) => {
  const id = req.params;
  db.collection('product')
    .findOne({ _id: new ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

// create
const store = (req, res) => {
  const { name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads/MongoDB', image.originalname);
    fs.renameSync(image.path, target);
    db.collection('product')
      .insertOne({ name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` })
      .then((result) => res.send(result))
      .catch((error) => res.send(error));
  }
};

// update
const update = async (req, res) => {
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
      const result = await db.collection('product').updateOne({ _id: req.params.id }, { $set: { name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` } });
      res.send(result);
    } catch (error) {
      res.send(error);
    }
  }
};

// delete
const destroy = (req, res) => {
  const id = req.params.id;
  db.collection('product')
    .deleteMany({ _id: new ObjectId(id) })
    .then((result) => res.send(result))
    .catch((error) => res.send(error));
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
