import Note from "../models/Note";

function getNotes(): Note {
  return new Note();
}

export { getNotes };
