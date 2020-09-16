import axios from "axios";

import { API } from "./constants";
import { Note } from "./models";

async function getNotes() {
  const res = await axios.get(API.GET_NOTES);

  const notes: Note[] = res.data;

  return notes;
}

async function createNote(text: string) {
  await axios.post(API.CREATE_NOTE, { text: text });
}

export { getNotes, createNote };
