import { Router, Request, Response } from "express";

import { getNotes, createNote } from "../services/notesService";
import Note from "../models/Note";

const router: Router = Router();

router.get("/", async (_, res: Response) => {
  const notes: Note[] = await getNotes();
  res.status(200).json(notes);
});

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

router.put("/:id", (_, res: Response) => {
  res.status(200).send("ERROR: NOT IMPLEMENTED");
});

router.delete("/:id", (_, res: Response) => {
  res.status(200).send("ERROR: NOT IMPLEMENTED");
});

export default router;
