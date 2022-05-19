let MongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
  let myobj = [
    {
      _id: ObjectId("6283f6a703f54b7c82c5fffc"),
      restaurant_id: ObjectId("6283f1d9804b848eb5e4560c"),
     
    },
    {
      _id: ObjectId("6283f6a703f54b7c82c5fffd"),
      restaurant_id: ObjectId("6283f1d9804b848eb5e4560c"),

    },
    {
      _id: ObjectId("6283f6a703f54b7c82c5fffe"),
      restaurant_id: ObjectId("6283f1d9804b848eb5e4560c"),
      
    },
    {
      _id: ObjectId("6283f6a703f54b7c82c5ffff"),
      restaurant_id: ObjectId("6283f1d9804b848eb5e4560d"),
     
    },
    {
      _id: ObjectId("6283f89194fb302443de7351"),
      restaurant_id: ObjectId("6283f1d9804b848eb5e4560d"),

    },
  ];

  dbo.collection("tables").insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
