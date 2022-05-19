let MongoClient = require("mongodb").MongoClient;
let ObjectId = require("mongodb").ObjectId;
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
  let myobj = [
    {
      _id: ObjectId("6283f1d9804b848eb5e4560c"),
      name: "Japanese Restaurant",
      menu_items: [
        {
          _id: ObjectId("6283f1d9804b848eb5e45600"),
          name: "salmon sushi",
          price: 18.99,
          description: "12 pcs salmon sushi",
          image_url:
            "https://izzycooking.com/wp-content/uploads/2022/05/Salmon-Nigiri.jpg",
          category: "Main Dish",
        },
        {
          _id: ObjectId("6283f1d9804b848eb5e45601"),
          name: "tuna sushi",
          price: 18.99,
          description: "12 pcs tuna sushi",
          image_url:
            "https://izzycooking.com/wp-content/uploads/2022/05/Salmon-Nigiri.jpg",
          category: "Main Dish",
        },
        {
          _id: ObjectId("6283f1d9804b848eb5e45602"),
          name: "kani sushi",
          price: 25.99,
          description: "6 pcs kani sushi",
          image_url:
            "https://izzycooking.com/wp-content/uploads/2022/05/Salmon-Nigiri.jpg",
          category: "Seasonal Special",
        },
        {
          _id: ObjectId("6283f1d9804b848eb5e45603"),
          name: "uni combo",
          price: 42.99,
          description: "uni on rice",
          image_url:
            "https://izzycooking.com/wp-content/uploads/2022/05/Salmon-Nigiri.jpg",
          category: "Seasonal Special",
        },
      ],
      employees: [
        {
          _id: ObjectId("6283f1d9804b848eb5e45604"),
          name: "Joe",
          password: "password123"
        },
        {
          _id: ObjectId("6283f1d9804b848eb5e45605"),
          name: "Jane",
          password: "password123"
        },
      ],
    },
    {
      _id: ObjectId("6283f1d9804b848eb5e4560d"),
      name: "Johnny n Amber's Bed n Breakfast",
      menu_items: [
        {
          _id: ObjectId("6283f1d9804b848eb5e45606"),
          name: "Western Omelette",
          price: 15.99,
          description: "3 cheese western omelette",
          image_url:
            "https://img.buzzfeed.com/thumbnailer-prod-us-east-1/f9b2c409d8124f1d97f145acd523bd79/BFV77395_HowToCookAPerfectOmelet_ADB_032221_V06l_16x9_YT.jpg",
          category: "Main Dish",
        },
        {
          _id: ObjectId("6283f1d9804b848eb5e45607"),
          name: "Bacon Omelette",
          price: 15.99,
          description: "3 cheese bacon omelette",
          image_url:
            "https://assets.wsimgs.com/wsimgs/ab/images/dp/recipe/202210/0044/img46l.jpg",
          category: "Main Dish",
        },
        {
          _id: ObjectId("6283f1d9804b848eb5e45608"),
          name: "Johnny's Breakfast of Champions",
          price: 10.99,
          description:
            "Fresh cup of black coffee and a single Marlboro Red with the filter lopped off",
          image_url:
            "https://izzycooking.com/wp-content/uploads/2022/05/Salmon-Nigiri.jpg",
          category: "Seasonal Special",
        },
        {
          _id: ObjectId("6283f1d9804b848eb5e45609"),
          name: "Amber's Triple-Thick Chocolate Sundae Surprise",
          price: 999.99,
          description:
            "For the discerning connoisseur, the world-renowned ice cream that's exclusively served hot",
          image_url:
            "https://www.thereciperebel.com/wp-content/uploads/2014/06/Grandmas-Hot-Fudge-Sundae-Cake-www.thereciperebel.com-4-of-11.jpg",
          category: "Seasonal Special",
        },
      ],
      employees: [
        {
          _id: ObjectId("6283f1d9804b848eb5e4560a"),
          name: "Johnny",
          password: "password123"
        },
        {
          _id: ObjectId("6283f1d9804b848eb5e4560b"),
          name: "Amber",
          password: "password123"
        },
      ],
    },
  ];

  dbo.collection("restaurants").insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log("Number of documents inserted: " + res.insertedCount);
    db.close();
  });
});
