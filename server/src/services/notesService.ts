import Note from "../models/Note";
import { getDb } from "./dbService";
import { ObjectId, ObjectID, Collection } from "mongodb";

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

async function deleteNote(id: string): Promise<boolean> {
  const collection: Collection<Note> = getDb().collection("notes");

  try {
    const objectId: ObjectId = new ObjectID(id);

    const res = await collection.deleteOne({ _id: objectId });

    return res.deletedCount === 1;
  } catch (error) {
    return false;
  }
}

export { getNotes, createNote, deleteNote };
