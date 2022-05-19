let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = 'mongodb://localhost:27017/';

const getOrdersByTableId = function (id) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db('mydb');
    let query = { table_id: id };
    dbo
      .collection('orders')
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        return result;
      });
  });
};

exports.getOrdersByTableId = getOrdersByTableId;

const getOrderById = function (id) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db('mydb');
    let query = { _id: id };
    dbo
      .collection('orders')
      .find(query)
      .toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        return result;
      });
  });
};

exports.getOrderById = getOrderById;

const createOrderByTableId = function (table_id, customersArr) {
  MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    let dbo = db.db('mydb');
    let myobj = {
      table_id: table_id,
      customers: customersArr,
      status: 'pending',
    };
    dbo.collection('orders').insertOne(myobj, function (err, res) {
      if (err) throw err;
      console.log('res: ', res); //confirmed that the res from insertOne returns the newly inserted entry data
      console.log('New Order added to Orders Collection');
      db.close();
    });
  });
};

exports.createOrderByTableId = createOrderByTableId;

//test
//getOrderById(ObjectId('6286c456311fb901c1d4ca3d'));
//getOrdersByTableId(ObjectId('6283f6a703f54b7c82c5fffc'));

let customersArr = [
  {
    name: 'Christian',
    sub_orders: [
      { menu_item_id: ObjectId('6283f1d9804b848eb5e45600'), quantity: 100 },
    ],
  },
  {
    name: 'Jack',
    sub_orders: [
      { menu_item_id: ObjectId('6283f1d9804b848eb5e45601'), quantity: 26 },
    ],
  },
];

createOrderByTableId(ObjectId('6283f6a703f54b7c82c5fffc'), customersArr);
