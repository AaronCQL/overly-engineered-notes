import Note from "../models/Note";
import { getDb } from "./dbService";
import { ObjectId } from "mongodb";

function getNotes(): Record<string, string> {
  return { text: "ERROR NOT IMPLEMENTED" };
}

async function createNote(text: string): Promise<Note> {
  const db = getDb();
  const collection = db.collection("notes");

  const doc: Note = {
    _id: new ObjectId(),
    text: text,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await collection.insertOne(doc);

  console.log(`Doc: "${doc._id}" inserted`);

  return doc;
}

export { getNotes, createNote };
