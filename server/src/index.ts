import "dotenv/config"; // make sure this is at the top

import app from "./services/server";
import { initDb } from "./services/database";

const port: string = process.env.PORT || "8000";

initDb().then(() => {
  app.listen(port, () => {
    console.log(`Express: started listening at port ${port}`);
  });
});
