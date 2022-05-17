let MongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
  let myobj = [
    {
      restaurant_id: ObjectId("6283f1d9804b848eb5e4560c"),
      table_id: ObjectId("6283f6a703f54b7c82c5fffc"),
      name: "Christian",
      suborders: [
        {
          order_id: ObjectId("6283f8bfa93da807fce321ac"),
          suborder_contents: [
            { menu_item_id: ObjectId("6283f1d9804b848eb5e45600"), quantity: 2 },
          ],
        },
        {
          order_id: ObjectId("6283f8bfa93da807fce321ad"),
          suborder_contents: [
            { menu_item_id: ObjectId("6283f1d9804b848eb5e45601"), quantity: 1 },
          ],
        },
      ],
    },
    {
      restaurant_id: ObjectId("6283f1d9804b848eb5e4560c"),
      table_id: ObjectId("6283f6a703f54b7c82c5fffd"),
      name: "Francesca",
      suborders: [
        {
          order_id: ObjectId("6283f8bfa93da807fce321ae"),
          suborder_contents: [
            { menu_item_id: ObjectId("6283f1d9804b848eb5e45602"), quantity: 2 },
          ],
        },
        {
          order_id: ObjectId("6283f8bfa93da807fce321af"),
          suborder_contents: [
            { menu_item_id: ObjectId("6283f1d9804b848eb5e45602"), quantity: 2 },
          ],
        },
      ],
    },
    {
      restaurant_id: ObjectId("6283f1d9804b848eb5e4560c"),
      table_id: ObjectId("6283f6a703f54b7c82c5fffe"),
      name: "Elroy",
      suborders: [
        {
          order_id: ObjectId("6283f8bfa93da807fce321b0"),
          suborder_contents: [
            { menu_item_id: ObjectId("6283f1d9804b848eb5e45602"), quantity: 2 },
            { menu_item_id: ObjectId("6283f1d9804b848eb5e45603"), quantity: 3 },
          ],
        },
        {
          order_id: ObjectId("6283f8bfa93da807fce321b1"),
          suborder_contents: [
            {
              menu_item_id: ObjectId("6283f1d9804b848eb5e45602"),
              quantity: 15,
            },
            {
              menu_item_id: ObjectId("6283f1d9804b848eb5e45603"),
              quantity: 10,
            },
          ],
        },
      ],
    },
    {
      restaurant_id: ObjectId("6283f1d9804b848eb5e4560c"),
      table_id: ObjectId("6283f6a703f54b7c82c5fffc"),
      name: "Jack",
      suborders: [
        {
          order_id: ObjectId("6283f8bfa93da807fce321ac"),
          suborder_contents: [
            { menu_item_id: ObjectId("6283f1d9804b848eb5e45600"), quantity: 8 },
          ],
        },
        {
          order_id: ObjectId("6283f8bfa93da807fce321ad"),
          suborder_contents: [
            { menu_item_id: ObjectId("6283f1d9804b848eb5e45601"), quantity: 7 },
          ],
        },
      ],
    },
    {
      restaurant_id: ObjectId("6283f1d9804b848eb5e4560c"),
      table_id: ObjectId("6283f6a703f54b7c82c5fffd"),
      name: "Jill",
      suborders: [
        {
          order_id: ObjectId("6283f8bfa93da807fce321ae"),
          suborder_contents: [
            { menu_item_id: ObjectId("6283f1d9804b848eb5e45602"), quantity: 9 },
          ],
        },
        {
          order_id: ObjectId("6283f8bfa93da807fce321af"),
          suborder_contents: [
            {
              menu_item_id: ObjectId("6283f1d9804b848eb5e45602"),
              quantity: 12,
            },
          ],
        },
      ],
    },
    {
      restaurant_id: ObjectId("6283f1d9804b848eb5e4560c"),
      table_id: ObjectId("6283f6a703f54b7c82c5fffe"),
      name: "Hill",
      suborders: [
        {
          order_id: ObjectId("6283f8bfa93da807fce321b0"),
          suborder_contents: [
            { menu_item_id: ObjectId("6283f1d9804b848eb5e45602"), quantity: 2 },
            {
              menu_item_id: ObjectId("6283f1d9804b848eb5e45603"),
              quantity: 30,
            },
          ],
        },
        {
          order_id: ObjectId("6283f8bfa93da807fce321b1"),
          suborder_contents: [
            {
              menu_item_id: ObjectId("6283f1d9804b848eb5e45602"),
              quantity: 1,
            },
          ],
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
