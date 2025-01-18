import { MongoClient } from "mongodb";
let db;

async function connectToDb(cb) {
  // Connecting to mongodb here
  //await makes sure that the user is connected first before running any other operations here
  const client = new MongoClient(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@mern-booking-app-db.omhfs.mongodb.net/?retryWrites=true&w=majority&appName=mern-booking-app-db`
  );
  await client.connect();
  //referencing our database
  db = client.db("react-blog-db");
  cb();
}
export { db, connectToDb };
