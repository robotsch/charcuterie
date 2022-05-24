let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
// let url = 'mongodb://localhost:27017/';
let url = process.env.DB_URL;

//gets all tables from a provided restaurant id
const getAllTablesByRestaurantId = function (id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let query = { restaurant_id: id };
      return dbo
        .collection('tables')
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;

          db.close();
          resolve(result);
        });
    });
  });
};

const createTableForRestoById = function (id, readable) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let myobj = { restaurant_id: id, readable_name: readable };
      return dbo.collection('tables').insertOne(myobj, function (err, res) {
        if (err) throw err;

        db.close();
        resolve(res);
      });
    });
  });
};

const deleteTableById = function (id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let myobj = { _id: id };
      return dbo.collection('tables').deleteOne(myobj, function (err, res) {
        if (err) throw err;

        db.close();
        resolve(res);
      });
    });
  });
};

const getTableReadableIdById = function (id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let query = { _id: id };
      return dbo
        .collection('tables')
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;

          db.close();
          resolve(result[0].readable_name);
        });
    });
  });
};

export {
  getAllTablesByRestaurantId,
  createTableForRestoById,
  deleteTableById,
  getTableReadableIdById,
};

//tests
//createTableForRestoById(ObjectId('6283f1d9804b848eb5e4560c'), 4);

// getAllTablesByRestaurantId(ObjectId('6283f1d9804b848eb5e4560c'));

// getAllTablesByRestaurantId(ObjectId('6283f1d9804b848eb5e4560d'));

//createTableForRestoById(ObjectId("6283f1d9804b848eb5e4560c"))
//deleteTableById(ObjectId('62858c31e5383c6b268f7157'));

//getTableReadableIdById(ObjectId('6283f6a703f54b7c82c5fffc'));
