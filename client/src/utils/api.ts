import axios from "axios";

import { API } from "./constants";
import { Note } from "./models";

async function getNotes(): Promise<Note[]> {
  const res = await axios.get(API.GET_NOTES);

  const notes: Note[] = res.data;

  return notes;
}

async function createNote(text: string): Promise<void> {
  await axios.post(API.CREATE_NOTE, { text: text });
}

async function deleteNote(id: string): Promise<void> {
  await axios.delete(`${API.DELETE_NOTE}/${id}`);
}

async function editNote(id: string, text: string): Promise<void> {
  await axios.put(`${API.DELETE_NOTE}/${id}`, { text: text });
}

export { getNotes, createNote, deleteNote, editNote };
