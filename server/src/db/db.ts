import { MongoClient } from 'mongodb';

const uri = process.env.DB_URL;

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env');
}

if (process.env.NODE_ENV === 'dev') {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

module.exports = clientPromise;
