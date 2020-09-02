import express, { Express } from "express";

import notesRouter from "./routes/notes";

const app: Express = express();
const port: string = process.env.PORT || "8000";

app.use("/notes", notesRouter);

app.listen(port, () => {
  console.log("Server started at Port 8000");
});
