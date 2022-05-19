// External Dependencies
import * as mongoDB from 'mongodb';
import * as dotenv from 'dotenv';

// Global Variables
export const collections: {
  restaurants?: mongoDB.Collection;
  tables?: mongoDB.Collection;
  users?: mongoDB.Collection;
} = {};

// Initialize Connection
export async function connectToDatabase() {
  dotenv.config();

  const DB_CONN_STRING: string = process.env.DB_CONN_STRING ?? 'null';
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(DB_CONN_STRING);

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const RESTAURANTS_COLLECTION_NAME: string =
    process.env.RESTAURANTS_COLLECTION_NAME ?? 'null';
  const restaurantsCollection: mongoDB.Collection = db.collection(
    RESTAURANTS_COLLECTION_NAME
  );

  collections.restaurants = restaurantsCollection;

  const TABLES_COLLECTION_NAME: string =
    process.env.TABLES_COLLECTION_NAME ?? 'null';
  const tablesCollection: mongoDB.Collection = db.collection(
    TABLES_COLLECTION_NAME
  );

  collections.tables = tablesCollection;
  const USERS_COLLECTION_NAME: string =
    process.env.USERS_COLLECTION_NAME ?? 'null';
  const usersCollection: mongoDB.Collection = db.collection(
    USERS_COLLECTION_NAME
  );

  collections.users = usersCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${restaurantsCollection.collectionName}`
  );
  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${tablesCollection.collectionName}`
  );
  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`
  );
}
