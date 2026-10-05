// Imported items:-
import { createClient } from "redis";


/*  Create redisClient instance */
const redisClient = createClient({
  url: process.env.REDIS_URL,
})


/* Redis client connect successfully code */
redisClient.on("ready", () => {
  console.log("Redis connected successfully");
});

/* Redis client connect error code */
redisClient.on("error", (error) => {
  console.log("Redis client Error", error);
})


/* connectRedis function */
export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.error("Redis connection failed:", error);
  }
};

export default redisClient;
