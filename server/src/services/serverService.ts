import express, { Express } from "express";

import notesRouter from "./../routes/notes";

const app: Express = express();

// default express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/notes", notesRouter);

export default app;
