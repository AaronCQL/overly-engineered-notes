import { Router, Request, Response } from "express";

import { getNotes, createNote, deleteNote } from "../services/notesService";
import Note from "../models/Note";

const router: Router = Router();

// GET request - return all notes
router.get("/", async (_, res: Response) => {
  const notes: Note[] = await getNotes();
  res.status(200).json(notes);
});

// POST request - create a note
router.post("/", async (req: Request, res: Response) => {
  const text: string | undefined = req.body.text;
  if (!text) {
    return res.status(400).send("Required field text is missing");
  }

  const trimmedText: string = text.trim();
  if (!trimmedText) {
    return res.status(400).send("Required field text cannot be empty string");
  }

  const createdNote: Note = await createNote(trimmedText);
  return res.status(201).json(createdNote);
});

// PUT request - edit an existing note
router.put("/:id", (_, res: Response) => {
  res.status(200).send("ERROR: NOT IMPLEMENTED");
});

// DELETE request - delete an existing note
router.delete("/:id", async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const isSuccessful: boolean = await deleteNote(id);

  return isSuccessful
    ? res.status(204)
    : res.status(404).send("Note not found");
});

export default router;
