// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { 
  restaurants?: mongoDB.Collection, 
  tables?: mongoDB.Collection, 
  users?: mongoDB.Collection, 

} = {}


// Initialize Connection
export async function connectToDatabase () {
   dotenv.config();

   const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING ? undefined) ;
           
   await client.connect();
       
   const db: mongoDB.Db = client.db(process.env.DB_NAME);
  
   const restaurantsCollection: mongoDB.Collection = db.collection(process.env.RESTAURANTS_COLLECTION_NAME);

 collections.restaurants = restaurantsCollection;

    const tablesCollection: mongoDB.Collection = db.collection(process.env.TABLES_COLLECTION_NAME);

 collections.tables = tablesCollection;

    const usersCollection: mongoDB.Collection = db.collection(process.env.USERS_COLLECTION_NAME);

 collections.users = usersCollection;
      
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${restaurantsCollection.collectionName}`);
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${tablesCollection.collectionName}`);
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`);
}