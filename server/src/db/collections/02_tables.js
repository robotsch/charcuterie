let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
  dbo.createCollection("tables", function (err, res) {
    if (err) throw err;
    console.log("Tables Collection created!");
    db.close();
  });
});
