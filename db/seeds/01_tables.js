let MongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
  let myobj = [
    {
      _id: 1,
      orders: [
        { _id: ObjectId(), status: "closed" },
        { _id: ObjectId(), status: "active" },
      ],
    },
    {
      _id: 2,
      orders: [
        { _id: ObjectId(), status: "closed" },
        { _id: ObjectId(), status: "active" },
      ],
    },
    {
      _id: 3,
      orders: [
        { _id: ObjectId(), status: "closed" },
        { _id: ObjectId(), status: "pending" },
      ],
    },
  ];

  dbo.collection("tables").insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
