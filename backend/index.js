import app from "./src/app.js";
import { serverConfig } from "./src/config/server.config.js";
import connect from "./src/db/connection.js";

// connect to db
connect();

// server listening
app.listen(serverConfig.PORT, () => {
  console.log("Server listen port: ", serverConfig.PORT);
});
