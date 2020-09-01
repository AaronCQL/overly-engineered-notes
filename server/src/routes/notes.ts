import { Router, Response } from "express";

import { getNotes } from "../services/notesService";
import Note from "../models/Note";

const router: Router = Router();

router.get("/", (_, res: Response) => {
  const note: Note = getNotes();
  res.json(note);
});

router.post("/create", (_, res: Response) => {
  res.status(200).send("ERROR: NOT IMPLEMENTED");
});

router.put("/update", (_, res: Response) => {
  res.status(200).send("ERROR: NOT IMPLEMENTED");
});

router.delete("/delete", (_, res: Response) => {
  res.status(200).send("ERROR: NOT IMPLEMENTED");
});

export default router;
