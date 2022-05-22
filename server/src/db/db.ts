import { MongoClient } from 'mongodb';
require('dotenv').config({ silent: true });

const uri = process.env.DB_URL;

let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to .env');
}

client = new MongoClient(uri);
clientPromise = client.connect();

module.exports = clientPromise;
