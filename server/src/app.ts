import express, { Express } from "express";

import notesRouter from "./routes/notes";

const app: Express = express();

app.use("/notes", notesRouter);

app.listen(8000, () => {
  console.log("Server started at Port 8000");
});
