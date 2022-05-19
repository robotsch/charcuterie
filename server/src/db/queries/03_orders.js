let MongoClient = require('mongodb').MongoClient;
let ObjectId = require("mongodb").ObjectId;
let url = "mongodb://localhost:27017/";


const getOrdersByTableId = function (id) {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
   let query = { table_id: id };
  dbo.collection("orders").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
}

exports.getOrdersByTableId = getOrdersByTableId

const getOrderById = function (id) {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
   let query = { _id: id };
  dbo.collection("orders").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
}

exports.getOrderById = getOrderById