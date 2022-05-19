let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log("Database created!");
  db.close();
});
