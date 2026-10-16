import { createClient } from "redis";


/*  Create redisClient instance */
const redisClient = createClient({
  url: process.env.REDIS_URI,
})


/* Redis error listener */
redisClient.on("error", (error) => {
  console.error("Redis connection error:", error.message);
})

/* Redis client reconnecting */
redisClient.on("reconnecting", () => {
  console.log("Redis reconnecting...");
});

/* Redis client connect successfully code */
redisClient.on("ready", () => {
  console.log("Connected to Redis!");
});

/* Redis client connection ending */
redisClient.on("end", () => {
  console.log("Redis connection closed!");
});


/* connectRedis function */
export const connectRedis = async () => {
  try {
    if (!redisClient.isOpen) {
      await redisClient.connect();
    }
  } catch (error) {
    console.error("Redis connection error:", error);
  }
};

export default redisClient;
