/* Imported elements */
import mongoose from "mongoose";


/* ConnectDb function */
const connectToDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDb database connected Successfully");

  } catch (error) {
    console.error("Error connecting to MongoDb Database", error);
  }
}

export default connectToDb;
