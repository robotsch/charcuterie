let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
// let url = 'mongodb://localhost:27017/';
let url = process.env.DB_URL;

const getAllRestaurants = function () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      return dbo
        .collection('restaurants')
        .find()
        .toArray(function (err, result) {
          if (err) throw err;
          //console.log(result);
          db.close();
          resolve(result);
        });
    });
  });
};

//let x = getAllRestaurants();
//console.log('x: ', x);

//exports.getAllRestaurants = getAllRestaurants;

const getRestaurantsWithId = function (id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let query = { _id: id };
      return dbo
        .collection('restaurants')
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;
          console.log(result);
          db.close();
          resolve(result);
        });
    });
  });
};

//exports.getRestaurantsWithId = getRestaurantsWithId;

const createRestaurant = function () {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let myobj = { menu_items: [], employees: [] };
      return dbo
        .collection('restaurants')
        .insertOne(myobj, function (err, res) {
          if (err) throw err;
          console.log('res: ', res); //confirmed that the res from insertOne returns the newly inserted entry data
          console.log('New Restaurant added to Collection');
          db.close();
          resolve(res);
        });
    });
  });
};

//exports.createRestaurant = createRestaurant;

const deleteRestaurantById = function (id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let myobj = { _id: id };
      return dbo
        .collection('restaurants')
        .deleteOne(myobj, function (err, res) {
          if (err) throw err;
          console.log('res: ', res); //confirmed that the res from insertOne returns the newly inserted entry data
          console.log(id, ' Restaurant removed from Collection');
          db.close();
          resolve(res);
        });
    });
  });
};

//exports.deleteRestaurantById = deleteRestaurantById;

const addMenuItemByRestaurantId = function (
  id,
  price,
  name,
  description,
  image_url,
  category
) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let query = { _id: id };
      let menuObj = {
        _id: ObjectId(),
        price: price,
        name: name,
        description: description,
        image_url: image_url,
        category: category,
      };
      let insertVal = { $push: { menu_items: menuObj } };
      return dbo
        .collection('restaurants')
        .updateOne(query, insertVal, function (err, res) {
          if (err) throw err;
          console.log('res: ', res); //confirmed that the res from insertOne returns the newly inserted entry data
          console.log('Added ', insertVal, ' to Restaurant: ', id);
          db.close();
          resolve(res);
        });
    });
  });
};

//exports.addMenuItemByRestaurantId = addMenuItemByRestaurantId;

const getEmployeeWithUsername = function (username) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let query = { employees: { $elemMatch: { username: username } } };
      return dbo
        .collection('restaurants')
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;
          //console.log(result);
          let employeesArr = result[0].employees;
          //console.log("arr: ", employeesArr)

          db.close();

          for (const elem of employeesArr) {
            if (elem.username === username) {
              console.log('elem: ', elem);
              resolve(elem);
            }
          }
        });
    });
  });
};

//xports.getEmployeeWithUsername = getEmployeeWithUsername;

const getMenuByRestaurantId = function (id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let query = { _id: id };
      return dbo
        .collection('restaurants')
        .find(query)
        .toArray(function (err, result) {
          if (err) throw err;
          //console.log(result);
          let restoObj = result[0].menu_items;
          console.log('restoObj: ', restoObj);

          db.close();
          resolve(restoObj);
        });
    });
  });
};

//exports.getMenuByRestaurantId = getMenuByRestaurantId;

const deleteMenuitemByRestaurantById = function (id) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let myobj = { _id: id };
      return dbo
        .collection('restaurants')
        .deleteOne(myobj, function (err, res) {
          if (err) throw err;
          console.log('res: ', res); //confirmed that the res from insertOne returns the newly inserted entry data
          console.log(id, ' Restaurant removed from Collection');
          db.close();
          resolve(res);
        });
    });
  });
};

//exports.deleteMenuItemByRestaurantById = deleteRestaurantById;

//deleteRestaurantById(ObjectId("628594f9b9fec226e1926067"));
//createRestaurant()
//addMenuItemByRestaurantId(ObjectId("6285c1e9c36ee97c630005d5"), 9.99, "California Roll", "A taste of California", "https://www.cheaprecipeblog.com/wp-content/uploads/2021/06/How-to-make-cheap-California-rolls-720x720.jpg", "Rolls")
//addMenuItemByRestaurantId(ObjectId("6285c1e9c36ee97c630005d5"), 9.99, "Double California Roll", "Twice the taste of California", "https://www.cheaprecipeblog.com/wp-content/uploads/2021/06/How-to-make-cheap-California-rolls-720x720.jpg", "Rolls")
//getEmployeeWithUsername("jado")
//getMenuByRestaurantId(ObjectId("6283f1d9804b848eb5e4560c"))

//getAllRestaurants();

export {
  getAllRestaurants,
  getRestaurantsWithId,
  createRestaurant,
  deleteRestaurantById,
  addMenuItemByRestaurantId,
  getEmployeeWithUsername,
  getMenuByRestaurantId,
  deleteMenuitemByRestaurantById,
};
