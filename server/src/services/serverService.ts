import express, { Express, Router } from "express";

import notesRouter from "./../routes/notes";

const app: Express = express();
const router: Router = express.Router();

// default express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// append `/api` prefix to all routes
app.use("/api", router);

// routes
router.use("/notes", notesRouter);

export default app;
