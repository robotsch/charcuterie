let MongoClient = require('mongodb').MongoClient;
let url = 'mongodb://localhost:27017/';

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  let dbo = db.db('mydb');
  dbo.collection('restaurants').drop(function (err, delOK) {
    if (err) throw err;
    if (delOK) console.log('Restaurants Collection purged');
    db.close();
  });
});
