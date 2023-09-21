const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017';
// const url = 'mongodb://127.0.0.1:27017/eduwork-native';
const client = new MongoClient(url);

(async () => {
  try {
    await client.connect();
    console.log('Connected successfully to server');
  } catch (e) {
    console.log(e);
  }
})();

const db = client.db('eduwork-native');
// const collection = db.collection('documents');

module.exports = db;
