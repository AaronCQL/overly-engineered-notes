import MongoClient from "mongodb";

const { ATLAS_USER, ATLAS_PASSWORD, NODE_ENV, MONGO_URL } = process.env;
const DB_NAME = `overly-engineered-notes-${NODE_ENV?.toUpperCase()}`;
const PROD_DB_URL = `mongodb+srv://${ATLAS_USER}:${ATLAS_PASSWORD}@aaroncql.aif7w.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const DEV_DB_URL = `mongodb://localhost:27017/${DB_NAME}`;
const URI: string =
  NODE_ENV === "test"
    ? (MONGO_URL as string) // helper env from @shelf/jest-mongodb
    : NODE_ENV === "prod"
    ? PROD_DB_URL
    : DEV_DB_URL;

const mongoClient: MongoClient.MongoClient = new MongoClient.MongoClient(URI, {
  useUnifiedTopology: true,
});

async function initDb(): Promise<void> {
  if (mongoClient.isConnected()) {
    console.warn(`MongoDB: ${DB_NAME} already connected`);
    return;
  }

  console.log(`MongoDB: connecting to ${DB_NAME} at ${URI}`);
  await mongoClient.connect();
  console.log(`MongoDB: successfully connected`);
}

function getDb(): MongoClient.Db {
  if (!mongoClient.isConnected()) {
    throw Error("MongoDB: not yet connected");
  }

  return mongoClient.db();
}

async function closeDb(): Promise<void> {
  if (!mongoClient.isConnected()) {
    console.warn(`MongoDB: already disconnected`);
    return;
  }

  await mongoClient.close();
  console.log("MongoDB: connection closed");
}

export { DB_NAME, URI, initDb, getDb, closeDb };
