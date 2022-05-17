let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
  let myobj = [
    {
      name: "salmon sushi",
      price: 18.99,
      description: "12 pcs salmon sushi",
      image_url:
        "https://izzycooking.com/wp-content/uploads/2022/05/Salmon-Nigiri.jpg",
      category: "Main Dish",
    },
    {
      name: "tuna sushi",
      price: 18.99,
      description: "12 pcs tuna sushi",
      image_url:
        "https://izzycooking.com/wp-content/uploads/2022/05/Salmon-Nigiri.jpg",
      category: "Main Dish",
    },
    {
      name: "kani sushi",
      price: 25.99,
      description: "6 pcs kani sushi",
      image_url:
        "https://izzycooking.com/wp-content/uploads/2022/05/Salmon-Nigiri.jpg",
      category: "Seasonal Special",
    },
    {
      name: "uni combo",
      price: 42.99,
      description: "uni on rice",
      image_url:
        "https://izzycooking.com/wp-content/uploads/2022/05/Salmon-Nigiri.jpg",
      category: "Seasonal Special",
    },
  ];

  dbo.collection("menu_items").insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
