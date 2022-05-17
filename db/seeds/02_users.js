let MongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
  let myobj = [
    {
      table_id: 1,
      name: "Christian",
      suborders: [
        {
          order_id: ObjectId("628352fc49e911a340c06fca"),
          menu_item_id: ObjectId("62834d450d423d154ee06933"),
          quantity: 2,
        },
        {
          order_id: ObjectId("628352fc49e911a340c06fcb"),
          menu_item_id: ObjectId("62834d450d423d154ee06933"),
          quantity: 1,
        },
      ],
    },
    {
      table_id: 2,
      name: "Francesca",
      suborders: [
        {
          order_id: ObjectId("628352fc49e911a340c06fcc"),
          menu_item_id: ObjectId("62834d450d423d154ee06933"),
          quantity: 2,
        },
        {
          order_id: ObjectId("628352fc49e911a340c06fcd"),
          menu_item_id: ObjectId("62834d450d423d154ee06935"),
          quantity: 1,
        },
      ],
    },
    {
      table_id: 3,
      name: "Elroy",
      suborders: [
        {
          order_id: ObjectId("628352fc49e911a340c06fce"),
          menu_item_id: ObjectId("62834d450d423d154ee06934"),
          quantity: 2,
        },
        {
          order_id: ObjectId("628352fc49e911a340c06fce"),
          menu_item_id: ObjectId("62834d450d423d154ee06936"),
          quantity: 5,
        },
        {
          order_id: ObjectId("628352fc49e911a340c06fce"),
          menu_item_id: ObjectId("62834d450d423d154ee06935"),
          quantity: 10,
        },
        {
          order_id: ObjectId("628352fc49e911a340c06fcf"),
          menu_item_id: ObjectId("62834d450d423d154ee06935"),
          quantity: 10,
        },
      ],
    },
    {
      table_id: 1,
      name: "Jack",
      suborders: [
        {
          order_id: ObjectId("628352fc49e911a340c06fca"),
          menu_item_id: ObjectId("62834d450d423d154ee06934"),
          quantity: 2,
        },
        {
          order_id: ObjectId("628352fc49e911a340c06fcb"),
          menu_item_id: ObjectId("62834d450d423d154ee06935"),
          quantity: 10,
        },
      ],
    },
    {
      table_id: 2,
      name: "Jill",
      suborders: [
        {
          order_id: ObjectId("628352fc49e911a340c06fcc"),
          menu_item_id: ObjectId("62834d450d423d154ee06933"),
          quantity: 2,
        },
        {
          order_id: ObjectId("628352fc49e911a340c06fcd"),
          menu_item_id: ObjectId("62834d450d423d154ee06935"),
          quantity: 19,
        },
      ],
    },
    {
      table_id: 3,
      name: "Hill",
      suborders: [
        {
          order_id: ObjectId("628352fc49e911a340c06fce"),
          menu_item_id: ObjectId("62834d450d423d154ee06933"),
          quantity: 6,
        },
        {
          order_id: ObjectId("628352fc49e911a340c06fcf"),
          menu_item_id: ObjectId("62834d450d423d154ee06933"),
          quantity: 3,
        },
      ],
    },
  ];

  dbo.collection("users").insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
