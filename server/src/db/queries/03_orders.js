let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = process.env.DB_URL;
//let url = 'mongodb://localhost:27017/';

const getOrdersByTableId = function (id, status) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let query = { table_id: id, status: status };
      dbo
        .collection('orders')
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;
          //console.log('result: ', result);
          db.close();
          resolve(result);
        });
    });
  });
};

const getOrderById = function (id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let query = { _id: id };
      dbo
        .collection('orders')
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;

          db.close();
          resolve(result);
        });
    });
  });
};

const createOrderByTableId = function (table_id, customersArr, restaurant) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let myobj = {
        table_id: table_id,
        customers: customersArr,
        status: 'pending',
        restaurant_id: restaurant,
      };
      dbo.collection('orders').insertOne(myobj, function (err, res) {
        if (err) throw err;

        db.close();
        resolve(res);
      });
    });
  });
};
//exports.createOrderByTableId = createOrderByTableId;

const setOrderStatusCompleteById = function (orderId) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let query = { _id: orderId };

      let insertVal = { $set: { status: 'completed' } };
      return dbo
        .collection('orders')
        .updateOne(query, insertVal, function (err, res) {
          if (err) throw err;

          db.close();
          resolve(res);
        });
    });
  });
};

const getAllOrdersByRestaurantId = function (restoId) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let query = { restaurant_id: restoId };
      return dbo
        .collection('orders')
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;
          console.log('result: ', result);
          db.close();

          resolve(result);
        });
    });
  });
};

export {
  getOrdersByTableId,
  getOrderById,
  createOrderByTableId,
  setOrderStatusCompleteById,
  getAllOrdersByRestaurantId,
};

//test
//getAllOrdersByRestaurantId(ObjectId('6283f1d9804b848eb5e4560c'));
//etOrdersByTableId(ObjectId('6283f6a703f54b7c82c5fffc'), 'pending');
//setOrderStatusCompleteById(ObjectId('6286c456311fb901c1d4ca3d'));
//getOrderById(ObjectId('6286c456311fb901c1d4ca3d'));
//getOrdersByTableId(ObjectId('6283f6a703f54b7c82c5fffc'));

// let customersArr = [
//   {
//     name: 'Christian',
//     sub_orders: [
//       { menu_item_id: ObjectId('6283f1d9804b848eb5e45600'), quantity: 100 },
//     ],
//   },
//   {
//     name: 'Jack',
//     sub_orders: [
//       { menu_item_id: ObjectId('6283f1d9804b848eb5e45601'), quantity: 26 },
//     ],
//   },
// ];

// createOrderByTableId(ObjectId('6283f6a703f54b7c82c5fffc'), customersArr);
