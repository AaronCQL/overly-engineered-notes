import Note from "../models/Note";
import { getDb } from "./dbService";
import { ObjectId, Collection } from "mongodb";

async function getNotes(): Promise<Note[]> {
  const collection: Collection<Note> = getDb().collection("notes");

  const notes: Note[] = await collection.find().toArray();

  console.log(`GET: ${notes.length} documents returned`);

  return notes;
}

async function createNote(text: string): Promise<Note> {
  const collection: Collection<Note> = getDb().collection("notes");

  const doc: Note = {
    _id: new ObjectId(),
    text: text,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  await collection.insertOne(doc);

  console.log(`POST: 1 document inserted (${doc._id})`);

  return doc;
}

export { getNotes, createNote };
