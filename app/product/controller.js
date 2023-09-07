const path = require('path');
const fs = require('fs');
const connection = require('../../config/database');
const { search } = require('./router');
const { exec } = require('child_process');

const index = (req, res) => {
  const { search } = req.query;
  let exec = {};
  if (search) {
    exec = {
      sql: 'SELECT * FROM products where name like ?;',
      values: [`%${search}%`],
    };
  } else {
    exec = {
      sql: 'SELECT * FROM products;',
      values: [`%${search}%`],
    };
  }
  // connection.connect();
  connection.query(exec, _response(res));
  // connection.end();
};

const view = (req, res) => {
  connection.query(
    {
      sql: 'select * from products where id = ? ;',
      values: [req.params.id],
    },
    _response(res)
  );
};

const destroy = (req, res) => {
  connection.query(
    {
      sql: 'delete from products where id = ? ;',
      values: [req.params.id],
    },
    _response(res)
  );
};

const store = (req, res) => {
  const { user_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    // res.sendFile(target);
    connection.query(
      {
        sql: 'insert into products (user_id, name, price, stock, status, image_url) values (?, ?, ?, ?, ?,?);',
        values: [parseInt(user_id), name, price, stock, status, `http://localhost:3000/public/${image.originalname}`],
      },
      _response(res)
    );
  }
};

const update = (req, res) => {
  const { user_id, name, price, stock, status } = req.body;
  const image = req.file;
  let sql = '';
  let values = [];
  if (image) {
    const target = path.join(__dirname, '../../uploads', image.originalname);
    fs.renameSync(image.path, target);
    sql = 'update products set user_id = ?, name = ?, price = ?, stock = ?, status = ?, image_url= ? where id = ?;';
    values = [parseInt(user_id), name, price, stock, status, `http://localhost:3000/public/${image.originalname}`, req.params.id];
  } else {
    sql = 'update products set user_id = ?, name = ?, price = ?, stock = ?, status = ? where id = ?;';
    values = [parseInt(user_id), name, price, stock, status, req.params.id];
  }
  connection.query(sql, values, _response(res));
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
  index,
  view,
  store,
  update,
  destroy,
};
