import mongoose from "mongoose";

const URI = process.env.MONGO_DB_URI;
const DB = process.env.MONGO_DB_NAME;

export const connectDB = async () => {
  try {
    const uri = `${URI}/${DB}`;
    const connection = await mongoose.connect(uri);
    console.log(`MongoDB Connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
