let MongoClient = require('mongodb').MongoClient;
let ObjectId = require("mongodb").ObjectId;
let url = "mongodb://localhost:27017/";

const getAllRestaurants = function () {
MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
  dbo.collection("restaurants").find().toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
}

exports.getAllRestaurants = getAllRestaurants;

const getRestaurantsWithId = function (id) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
  let query = { _id: id };
  dbo.collection("restaurants").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    db.close();
  });
});
}

exports.getRestaurantsWithId = getRestaurantsWithId;


const createRestaurant = function () {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
  let myobj = {menu_items: [], employees: []};
  dbo.collection("restaurants").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("res: ", res) //confirmed that the res from insertOne returns the newly inserted entry data
    console.log("New Restaurant added to Collection");
    db.close();
  });
});
}

exports.createRestaurant = createRestaurant

const deleteRestaurantById = function (id) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
  let myobj = { _id: id };
  dbo.collection("restaurants").deleteOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("res: ", res) //confirmed that the res from insertOne returns the newly inserted entry data
    console.log(id, " Restaurant removed from Collection");
    db.close();
  });
});
}

exports.deleteRestaurantById = deleteRestaurantById

const updateRestaurantMenuById = function (id, price, name, description, image_url, category) {
  MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("mydb");
  let query = { _id: id };
  let menuObj = {
    _id: ObjectId(),
    price: price,
    name: name,
    description: description,
    image_url: image_url,
    category: category

  }
  let insertVal = { $push: {menu_items: menuObj} }
  dbo.collection("restaurants").updateOne(query, insertVal, function(err, res) {
    if (err) throw err;
    console.log("res: ", res) //confirmed that the res from insertOne returns the newly inserted entry data
    console.log("Added ", insertVal, " to Restaurant: ", id);
    db.close();
  });
});
}

exports.updateRestaurantMenuById = updateRestaurantMenuById 

//deleteRestaurantById(ObjectId("628594f9b9fec226e1926067"));
//createRestaurant()
//updateRestaurantMenuById(ObjectId("6285c1e9c36ee97c630005d5"), 9.99, "California Roll", "A taste of California", "https://www.cheaprecipeblog.com/wp-content/uploads/2021/06/How-to-make-cheap-California-rolls-720x720.jpg", "Rolls")
updateRestaurantMenuById(ObjectId("6285c1e9c36ee97c630005d5"), 9.99, "Double California Roll", "Twice the taste of California", "https://www.cheaprecipeblog.com/wp-content/uploads/2021/06/How-to-make-cheap-California-rolls-720x720.jpg", "Rolls")