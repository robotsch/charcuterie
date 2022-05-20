let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = 'mongodb://localhost:27017/';

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
          // console.log("results: ", result);
          // console.log("orders: ", result[0].orders[0]);
          db.close();
          resolve(result);
        });
    });
  });
};

const createTableForRestoById = function (id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let myobj = { restaurant_id: id };
      return dbo.collection('tables').insertOne(myobj, function (err, res) {
        if (err) throw err;
        console.log('res: ', res); //confirmed that the res from insertOne returns the newly inserted entry data
        console.log('New Table added to Table Collection');
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
        console.log('res: ', res); //confirmed that the res from insertOne returns the newly inserted entry data
        console.log(id, ' Table removed from Table Collection');
        db.close();
        resolve(res);
      });
    });
  });
};

export { getAllTablesByRestaurantId, createTableForRestoById, deleteTableById };

//tests

// getAllTablesByRestaurantId(ObjectId('6283f1d9804b848eb5e4560c'));

// getAllTablesByRestaurantId(ObjectId('6283f1d9804b848eb5e4560d'));

//createTableForRestoById(ObjectId("6283f1d9804b848eb5e4560c"))
//deleteTableById(ObjectId('62858c31e5383c6b268f7157'));
