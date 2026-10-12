import "dotenv/config";
import app from './src/app.js';
import dns from "dns";
import connectToDb from './src/db/db.js';
import * as redis from "./src/db/redis.js";


/* Set server dns menually */
dns.setServers(["1.1.1.1", "8.8.8.8"]);

/* Connect to mongodDb database */
connectToDb();

/* Set PORT for server */
const PORT = process.env.PORT || 3000;

/* Connect to redis database */
await redis.connectRedis();


/* Server started */
app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
})
