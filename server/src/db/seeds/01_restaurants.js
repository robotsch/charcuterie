let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
let url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  let dbo = db.db('mydb');
  let myobj = [
    {
      _id: ObjectId('6283f1d9804b848eb5e4560c'),
      name: 'Japanese Restaurant',
      menu_items: [
        {
          _id: ObjectId(),
          name: 'Edamame',
          price: 600,
          description: 'Roasted green tea infused edamame',
          image_url:
            'https://d1ralsognjng37.cloudfront.net/6c94eb50-ba25-41c9-aaaa-63e602127720.jpeg',
          category: 'Appetizer',
        },
        {
          _id: ObjectId(),
          name: 'Crispy Vegetarian Gyoza',
          price: 800,
          description: '5pc Vegetarian Gyoza',
          image_url:
            'https://tb-static.uber.com/prod/image-proc/processed_images/1a52870aebaf25a8d3988e7bfd2a237c/b4facf495c22df52f3ca635379ebe613.jpeg',
          category: 'Appetizer',
        },
        {
          _id: ObjectId(),
          name: 'Takoyaki',
          price: 1500,
          description: '10pc Takoyaki',
          image_url:
            'https://tb-static.uber.com/prod/image-proc/processed_images/e73a2951074ab10acbdff81316a3e367/b4facf495c22df52f3ca635379ebe613.jpeg',
          category: 'Appetizer',
        },
        {
          _id: ObjectId(),
          name: 'Okonomiyaki',
          price: 1300,
          description: 'Savory pancake made with vegetables, meat, and seafood',
          image_url:
            'https://tb-static.uber.com/prod/image-proc/processed_images/3d84ae26ad5a383e307d8f210bb40d4c/b4facf495c22df52f3ca635379ebe613.jpeg',
          category: 'Appetizer',
        },
        {
          _id: ObjectId(),
          name: 'Chicken Karaage',
          price: 1800,
          description: '10pc Fried Chicken',
          image_url:
            'https://tb-static.uber.com/prod/image-proc/processed_images/78d6ae1dbd05b4775b57829e7c2b4584/b4facf495c22df52f3ca635379ebe613.jpeg',
          category: 'Appetizer',
        },
        {
          _id: ObjectId(),
          name: 'Chicken Tempura',
          price: 1400,
          description:
            'Chicken Tempura with House made Tartar and Sweet Soy Vinegar',
          image_url:
            'https://tb-static.uber.com/prod/image-proc/processed_images/a79a12c276f7b6ec11d5ace9e9d3abfd/b4facf495c22df52f3ca635379ebe613.jpeg',
          category: 'Appetizer',
        },
        {
          _id: ObjectId(),
          name: 'Okonomiyaki Fries',
          price: 900,
          description:
            'Fries topped with ingredients traditionally used for our Okonomiyaki',
          image_url:
            'https://tb-static.uber.com/prod/image-proc/processed_images/4bf13182b59a75b955337ed4c7f57a1a/b4facf495c22df52f3ca635379ebe613.jpeg',
          category: 'Appetizer',
        },
        {
          _id: ObjectId(),
          name: 'House Udon',
          price: 1900,
          description: 'Udon with beef + mushrooms + scallions',
          image_url:
            'https://d1ralsognjng37.cloudfront.net/30cc0ae6-0189-48d6-816c-7ed7659a49f9.jpeg',
          category: 'Noodles',
        },
        {
          _id: ObjectId(),
          name: 'Mentai Kimchi Udon',
          price: 1700,
          description: 'Udon spicy cod roe + kimchi + scallions',
          image_url:
            'https://tb-static.uber.com/prod/image-proc/processed_images/1005e467cc37c3c42286d89d999d2387/b4facf495c22df52f3ca635379ebe613.jpeg',
          category: 'Noodles',
        },
        {
          _id: ObjectId('6283f1d9804b848eb5e45600'),
          name: 'Beef Udon',
          price: 1900,
          description: 'Udon with beef + vegetables + dashi broth',
          image_url:
            'https://d1ralsognjng37.cloudfront.net/96296737-ec03-44b7-a89a-94c3ad1a4565.jpeg',
          category: 'Noodles',
        },
        {
          _id: ObjectId('6283f1d9804b848eb5e45601'),
          name: 'Carbonara Udon',
          price: 1900,
          description: 'Udon with bacon + onion + soft boiled egg',
          image_url:
            'hhttps://tb-static.uber.com/prod/image-proc/processed_images/01f8a6230894b535657c0baf8c1644ed/b4facf495c22df52f3ca635379ebe613.jpeg',
          category: 'Noodles',
        },
        {
          _id: ObjectId('6283f1d9804b848eb5e45602'),
          name: 'Salmon Oshizushi',
          price: 1800,
          description: '6pc Torched Salmon Sushi',
          image_url:
            'https://d1ralsognjng37.cloudfront.net/1389b659-8af0-4649-880d-c68afb00ca08.jpeg',
          category: 'Torched Sushi',
        },
        {
          _id: ObjectId('6283f1d9804b848eb5e45603'),
          name: 'Mackerel Oshizushi',
          price: 1800,
          description: '6pc Torched Mackerel Sushi',
          image_url:
            'https://d1ralsognjng37.cloudfront.net/2d8057d5-6e13-4cab-9e68-14def5712c60.jpeg',
          category: 'Torched Sushi',
        },
        {
          _id: ObjectId(),
          name: 'Scallop Oshizushi',
          price: 1800,
          description: '6pc Torched Scallop Sushi',
          image_url:
            'https://d1ralsognjng37.cloudfront.net/22c0c7e7-576a-492e-a16b-ad3940c0e747.jpeg',
          category: 'Torched Sushi',
        },
        {
          _id: ObjectId(),
          name: 'Tiger Shrimp Oshizushi',
          price: 1800,
          description: '6pc Torched Tiger Shrimp Sushi',
          image_url:
            'https://d1ralsognjng37.cloudfront.net/1bca8baa-a53e-4df8-88ba-e63ba2bb3816.jpeg',
          category: 'Torched Sushi',
        },
        {
          _id: ObjectId(),
          name: 'Grilled Salmon Bento',
          price: 1800,
          description:
            'Grilled salmon + fish cake tempura + pickled vegetables + dashimaki egg + shredded egg + rice',
          image_url:
            'https://tb-static.uber.com/prod/image-proc/processed_images/0d5bf910eefdd41c9ae8748520ba98c3/b4facf495c22df52f3ca635379ebe613.jpeg',
          category: 'Bento',
        },
        {
          _id: ObjectId(),
          name: 'Grilled Mackerel Bento',
          price: 1800,
          description:
            'Grilled Mackerel + fish cake tempura + pickled vegetables + dashimaki egg + shredded egg + rice',
          image_url:
            'https://tb-static.uber.com/prod/image-proc/processed_images/6787bacb9d56cc8bad3dd4363eef417e/b4facf495c22df52f3ca635379ebe613.jpeg',
          category: 'Bento',
        },
        {
          _id: ObjectId(),
          name: 'Beef Bento',
          price: 1800,
          description:
            'Beef + fish cake tempura + pickled vegetables + dashimaki egg + shredded egg + rice',
          image_url:
            'https://tb-static.uber.com/prod/image-proc/processed_images/021281e5354c5fbce1aa5744c0fa393e/b4facf495c22df52f3ca635379ebe613.jpeg',
          category: 'Bento',
        },
        {
          _id: ObjectId(),
          name: 'Chicken Karaage Bento',
          price: 1800,
          description:
            'Chicken karaage + fish cake tempura + pickled vegetables + dashimaki egg + shredded egg + rice',
          image_url:
            'https://tb-static.uber.com/prod/image-proc/processed_images/371a85707aa3c5d11a8bb3aa2cc4f242/b4facf495c22df52f3ca635379ebe613.jpeg',
          category: 'Bento',
        },
        {
          _id: ObjectId(),
          name: 'Chicken Tempura Bento',
          price: 1800,
          description:
            'Chicken tempura + fish cake tempura + pickled vegetables + dashimaki egg + shredded egg + rice',
          image_url:
            'https://cdn.shopify.com/s/files/1/0261/9123/3121/articles/Niku_Sushi.jpg?v=1598630269',
          category: 'Bento',
        },
      ],
      employees: [
        {
          _id: ObjectId('6283f1d9804b848eb5e45604'),
          fname: 'Joe',
          lname: 'Joes',
          username: 'jojo',
          password:
            '$2b$10$/Ra4bajZQP7LOY2nadS0TOkwqcOAwuz095wjMZIvF9XnkSHdXQJpu',
        },
        {
          _id: ObjectId('6283f1d9804b848eb5e45605'),
          fname: 'Jane',
          lname: 'Doe',
          username: 'jado',
          password:
            '$2b$10$NpZzMj.0vjH3HCTX0V35pOK43eBQLtKfItCnqQopEPFxUm9GI2I9m',
        },
      ],
    },
    {
      _id: ObjectId('6283f1d9804b848eb5e4560d'),
      name: 'Breakfast Restaurant',
      menu_items: [
        {
          _id: ObjectId('6283f1d9804b848eb5e45606'),
          name: 'Western Omelette',
          price: 1599,
          description: '3 cheese western omelette',
          image_url:
            'https://img.buzzfeed.com/thumbnailer-prod-us-east-1/f9b2c409d8124f1d97f145acd523bd79/BFV77395_HowToCookAPerfectOmelet_ADB_032221_V06l_16x9_YT.jpg',
          category: 'Main Dish',
        },
        {
          _id: ObjectId('6283f1d9804b848eb5e45607'),
          name: 'Bacon Omelette',
          price: 1599,
          description: '3 cheese bacon omelette',
          image_url:
            'https://assets.wsimgs.com/wsimgs/ab/images/dp/recipe/202210/0044/img46l.jpg',
          category: 'Main Dish',
        },
        {
          _id: ObjectId('6283f1d9804b848eb5e45608'),
          name: 'Breakfast of Champions',
          price: 1099,
          description: 'Fresh cup of black coffee and a single Marlboro Red',
          image_url:
            'https://media.baamboozle.com/uploads/images/343025/1619117637_141638.jpeg',
          category: 'Seasonal Special',
        },
        {
          _id: ObjectId('6283f1d9804b848eb5e45609'),
          name: 'Triple-Thick Chocolate Sundae',
          price: 99999,
          description:
            'Chocolate sundae with chocolate filling topped with chocolate',
          image_url:
            'https://www.thereciperebel.com/wp-content/uploads/2014/06/Grandmas-Hot-Fudge-Sundae-Cake-www.thereciperebel.com-4-of-11.jpg',
          category: 'Seasonal Special',
        },
      ],
      employees: [
        {
          _id: ObjectId('6283f1d9804b848eb5e4560a'),
          fname: 'Johnny',
          lname: 'Johnnyman',
          username: 'otheruser',
          password:
            '$2b$10$vjSqa3U51P9woTvgyEEeUOWykQm/Pk3sUMTx/XJ1c/mIsWKUcJQaW',
        },
        {
          _id: ObjectId('6283f1d9804b848eb5e4560b'),
          fname: 'Johnny',
          lname: 'Johnson',
          username: 'anotheruser',
          password:
            '$2b$10$z5b4v6g4spVYyrY7vdtn1uTfnvW6oh95FhsA1xyZD4ZBO53GKB9/m',
        },
      ],
    },
  ];

  dbo.collection('restaurants').insertMany(myobj, function (err, res) {
    if (err) throw err;
    console.log('Number of documents inserted: ' + res.insertedCount);
    db.close();
  });
});
