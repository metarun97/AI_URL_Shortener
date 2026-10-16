import mongoose from "mongoose";


/* ConnectDb function */
const connectToDb = async () => {
  try {

    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB!");

  } catch (error) {

    console.error("Error to connect MongoDb:", error);

  }
}

export default connectToDb;
