let MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectId;
//let url = 'mongodb://localhost:27017/';
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

          db.close();
          resolve(result);
        });
    });
  });
};

//exports.getAllRestaurants = getAllRestaurants;

const getRestaurantWithId = function (id) {
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
          db.close();
          resolve(result[0]);
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

          db.close();
          resolve(res);
        });
    });
  });
};

//exports.deleteRestaurantById = deleteRestaurantById;

const addMenuItemByRestaurantId = function (id, itemData) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let query = { _id: id };
      let menuObj = {
        _id: ObjectId(),
        ...itemData,
      };
      let insertVal = { $push: { menu_items: menuObj } };
      return dbo
        .collection('restaurants')
        .updateOne(query, insertVal, function (err, res) {
          if (err) throw err;

          db.close();
          resolve(res);
        });
    });
  });
};

//exports.addMenuItemByRestaurantId = addMenuItemByRestaurantId;

const getEmployeeWithUsername = function (username) {
  console.log(username)
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

          if (result.length === 0) {
            db.close();
            resolve(false);
            return false;
          }

          let employeesArr = result[0].employees;

          db.close();

          for (const elem of employeesArr) {
            if (elem.username === username) {
              let returnObj = { restoId: result[0]._id, employee: elem };
              //console.log('return: ', returnObj);
              resolve(returnObj);
            }
          }
        });
    });
  });
};

//exports.getEmployeeWithUsername = getEmployeeWithUsername;

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

          let restoObj = result[0].menu_items;
          db.close();
          resolve(restoObj);
        });
    });
  });
};

//exports.getMenuByRestaurantId = getMenuByRestaurantId;

const deleteMenuItemByRestaurantId = function (restoId, menuId) {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      let dbo = db.db('mydb');
      let query = { _id: restoId };

      let insertVal = { $pull: { menu_items: { _id: menuId } } };
      return dbo
        .collection('restaurants')
        .updateOne(query, insertVal, function (err, res) {
          if (err) throw err;

          db.close();
          resolve(res);
        });
    });
  });
};

// exports.deleteMenuItemByRestaurantById = deleteMenuItemByRestaurantId;

//deleteRestaurantById(ObjectId("628594f9b9fec226e1926067"));
//createRestaurant()
// addMenuItemByRestaurantId(
//   ObjectId('6283f1d9804b848eb5e4560c'),
//   9.99,
//   'California Roll',
//   'A taste of California',
//   'https://www.cheaprecipeblog.com/wp-content/uploads/2021/06/How-to-make-cheap-California-rolls-720x720.jpg',
//   'Rolls'
// );
// addMenuItemByRestaurantId(
//   ObjectId('6283f1d9804b848eb5e4560c'),
//   9.99,
//   'Double California Roll',
//   'Twice the taste of California',
//   'https://www.cheaprecipeblog.com/wp-content/uploads/2021/06/How-to-make-cheap-California-rolls-720x720.jpg',
//   'Rolls'
// );
//getEmployeeWithUsername('jado123');
//getMenuByRestaurantId(ObjectId("6283f1d9804b848eb5e4560c"))

//getAllRestaurants();

// deleteMenuitemByRestaurantById(
//   ObjectId('6283f1d9804b848eb5e4560c'),
//   ObjectId('6289379b39e83170ecfacfc3')
// );

export {
  getAllRestaurants,
  getRestaurantWithId,
  createRestaurant,
  deleteRestaurantById,
  addMenuItemByRestaurantId,
  getEmployeeWithUsername,
  getMenuByRestaurantId,
  deleteMenuItemByRestaurantId,
};
