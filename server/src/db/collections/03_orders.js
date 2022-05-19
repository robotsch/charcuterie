let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
  dbo.createCollection("orders", function (err, res) {
    if (err) throw err;
    console.log("Orders Collection created!");
    db.close();
  });
});
