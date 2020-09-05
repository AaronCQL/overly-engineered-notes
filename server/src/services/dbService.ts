import MongoClient from "mongodb";

const { ATLAS_USER, ATLAS_PASSWORD, NODE_ENV } = process.env;
const DB_NAME = `cs3219-otot-a-${NODE_ENV?.toUpperCase()}`;
const URI =
  NODE_ENV === "prod"
    ? `mongodb+srv://${ATLAS_USER}:${ATLAS_PASSWORD}@aaroncql.aif7w.gcp.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
    : "mongodb://localhost:27017/";

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

  return mongoClient.db(DB_NAME);
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
