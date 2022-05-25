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
          name: 'Lobster Miso Soup',
          price: 900,
          description: 'Lobster miso soup w/ bonito broth',
          image_url: 'http://www.oksfood.com/image/iseebimisoshiru.jpg',
          category: 'Appetizer',
        },
        {
          _id: ObjectId(),
          name: 'Ochamame',
          price: 800,
          description: 'Roasted green tea infused edamame',
          image_url:
            'https://makeyourmeals.com/wp-content/uploads/2020/02/featured-edamame-480x480.jpg',
          category: 'Appetizer',
        },
        {
          _id: ObjectId(),
          name: 'Hokkaido Salad',
          price: 1500,
          description: 'Salt cured salmon, ikura, snow crab, greens',
          image_url:
            'http://www.quirkyaesthetics.com/uploads/2/2/5/3/22530782/2c7a3280-20210707_orig.jpg',
          category: 'Appetizer',
        },
        {
          _id: ObjectId(),
          name: 'Green Salad',
          price: 1000,
          description: 'Mixed greens, cucumber',
          image_url:
            'https://www.blogto.com/listings/restaurants/upload/2012/11/20121119-jabistro590-09.jpg',
          category: 'Appetizer',
        },
        {
          _id: ObjectId(),
          name: 'Hotate Carpaccio',
          price: 1800,
          description: 'Scallop sashimi, ponzu dressing',
          image_url:
            'http://www.quirkyaesthetics.com/uploads/2/2/5/3/22530782/2c7a3269-20210707_orig.jpg',
          category: 'Appetizer',
        },
        {
          _id: ObjectId(),
          name: 'Wagyu Carpaccio',
          price: 2600,
          description: 'Wagyu beef sashimi, ponzu dressing',
          image_url:
            'https://images.getbento.com/accounts/25fd617895d952103480e78213c748cf/media/images/1578492947560.jpeg?w=1000&fit=max&auto=compress,format&h=1000',
          category: 'Appetizer',
        },
        {
          _id: ObjectId(),
          name: 'Sashimi Appetizer',
          price: 3900,
          description: "Chef's selection of assorted sashimi",
          image_url:
            'http://wherejessate.com/wp-content/uploads/2016/08/DSC08369-1-500x333.jpg',
          category: 'Appetizer',
        },
        {
          _id: ObjectId(),
          name: 'Sashimi Platter',
          price: 13900,
          description: 'Selection of assorted sashimi',
          image_url: 'https://images.otstatic.com/prod/27876883/2/huge.jpg',
          category: 'Sashimi',
        },
        {
          _id: ObjectId(),
          name: 'Lobster Platter',
          price: 20000,
          description: 'Lobster sashimi cannot be beat',
          image_url:
            'https://style.ca/wp-content/uploads/2020/10/Copy-of-0E0A1436-lobster-platter-768x512.jpg',
          category: 'Sashimi',
        },
        {
          _id: ObjectId('6283f1d9804b848eb5e45600'),
          name: 'Nama',
          price: 4000,
          description: 'Classic nigiri 7 pcs',
          image_url:
            'https://smilingmango.files.wordpress.com/2012/11/jabistro-nama.jpeg?w=551',
          category: 'Sushi - Nigiri',
        },
        {
          _id: ObjectId('6283f1d9804b848eb5e45601'),
          name: 'Kyukyoku',
          price: 7000,
          description: 'Ultimate fresh pieces',
          image_url:
            'https://pbs.twimg.com/media/CcopYOZUAAAX3C_?format=jpg&name=small',
          category: 'Sushi - Nigiri',
        },
        {
          _id: ObjectId('6283f1d9804b848eb5e45602'),
          name: 'Tai',
          price: 1000,
          description: '2pc Sea Bream',
          image_url:
            'https://images.squarespace-cdn.com/content/v1/59488c7dbf629aaeded8b9b1/1497929035228-PDZ46QP8BURO8SO7F31L/tai.jpg',
          category: 'Sushi - A La Carte',
        },
        {
          _id: ObjectId('6283f1d9804b848eb5e45603'),
          name: 'Hamachi',
          price: 900,
          description: '2pc Yellowtail',
          image_url:
            'https://images.fineartamerica.com/images-medium-large-5/sushi-hamachi-ryouchin.jpg',
          category: 'Sushi - A La Carte',
        },
        {
          _id: ObjectId(),
          name: 'Kampachi',
          price: 1100,
          description: '2pc Amberjack',
          image_url:
            'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001845/img/en/a0001845_parts_5a6019adae626.jpg?20200817191417&q=80&rw=686&rh=490',
          category: 'Sushi - A La Carte',
        },
        {
          _id: ObjectId(),
          name: 'Salmon',
          price: 900,
          description: '2pc Atlantic Salmon',
          image_url:
            'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001845/img/en/a0001845_parts_5a6018b020c15.jpg?20200817191417&q=80&rw=686&rh=490',
          category: 'Sushi - A La Carte',
        },
        {
          _id: ObjectId(),
          name: 'Hotate',
          price: 900,
          description: '2pc Scallop',
          image_url:
            'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001845/img/en/a0001845_parts_5a601a784abbf.jpg?20200817191417&q=80&rw=686&rh=490',
          category: 'Sushi - A La Carte',
        },
        {
          _id: ObjectId(),
          name: 'Akami',
          price: 1600,
          description: '2pc Blue Fin Tuna',
          image_url:
            'https://as2.ftcdn.net/v2/jpg/01/65/11/35/1000_F_165113551_7IFwBrU8zGpJ6rNRPHUAuoFPw6Asrydo.jpg',
          category: 'Sushi - A La Carte',
        },
        {
          _id: ObjectId(),
          name: 'Chu-Toro',
          price: 2000,
          description: '2pc Mid Fatty Blue Fin Tuna',
          image_url:
            'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001845/img/en/a0001845_parts_5a60190ac9560.jpg?20200817191417&q=80&rw=686&rh=490',
          category: 'Sushi - A La Carte',
        },
        {
          _id: ObjectId(),
          name: 'O-Toro',
          price: 2800,
          description: '2pc Fatty Blue Fin Tuna',
          image_url:
            'https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001845/img/en/a0001845_parts_5a60191fd1ddb.jpg?20200817191417&q=80&rw=686&rh=490',
          category: 'Sushi - A La Carte',
        },
        {
          _id: ObjectId(),
          name: 'Wagyu',
          price: 2800,
          description: '2pc Wagyu Beef',
          image_url:
            'https://cdn.shopify.com/s/files/1/0261/9123/3121/articles/Niku_Sushi.jpg?v=1598630269',
          category: 'Sushi - A La Carte',
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
      name: "Johnny n Amber's Bed n Breakfast",
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
          name: "Johnny's Breakfast of Champions",
          price: 1099,
          description:
            'Fresh cup of black coffee and a single Marlboro Red with the filter lopped off',
          image_url:
            'https://izzycooking.com/wp-content/uploads/2022/05/Salmon-Nigiri.jpg',
          category: 'Seasonal Special',
        },
        {
          _id: ObjectId('6283f1d9804b848eb5e45609'),
          name: "Amber's Triple-Thick Chocolate Sundae Surprise",
          price: 99999,
          description:
            "For the discerning connoisseur, the world-renowned ice cream that's exclusively served hot",
          image_url:
            'https://www.thereciperebel.com/wp-content/uploads/2014/06/Grandmas-Hot-Fudge-Sundae-Cake-www.thereciperebel.com-4-of-11.jpg',
          category: 'Seasonal Special',
        },
      ],
      employees: [
        {
          _id: ObjectId('6283f1d9804b848eb5e4560a'),
          fname: 'Johnny',
          lname: 'Depp',
          username: 'captainjack',
          password:
            '$2b$10$vjSqa3U51P9woTvgyEEeUOWykQm/Pk3sUMTx/XJ1c/mIsWKUcJQaW',
        },
        {
          _id: ObjectId('6283f1d9804b848eb5e4560b'),
          fname: 'Amber',
          lname: 'Heard',
          username: 'mera',
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
