import app from "./src/app.js";
import { config } from "./src/config/index.js";

// connect to db
//have to add db connection logic

// server listening
app.listen(config.PORT, () => {
  console.log("Server listen port: ", config.PORT);
});
