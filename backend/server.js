import "dotenv/config";
import app from './src/app.js';
import dns from "dns";
import connectToDb from './src/db/db.js';
import { connectRedis } from "./src/db/redis.js";

/* Set server dns menually */
dns.setServers(["1.1.1.1", "8.8.8.8"]);

/* Connect to mongodDb database */
connectToDb();


const PORT = process.env.PORT || 3000;

/* Connect to redis database */
await connectRedis();

/* Server started */
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is healthy",
  });
});

/* Server started */
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
})
