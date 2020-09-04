import "dotenv/config"; // make sure this is at the top
import express, { Express } from "express";

import notesRouter from "./routes/notes";
import { initDb } from "./services/dbService";

const app: Express = express();
const port: string = process.env.PORT || "8000";

// default express body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/notes", notesRouter);

initDb().then(() => {
  app.listen(port, () => console.log("Server started at port 8000"));
});
