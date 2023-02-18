import mongoose from "mongoose";

const URI = process.env.MONGO_DB_URI;
const DB = process.env.MONGO_DB_NAME;

const uri = `${URI}/${DB}`;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export const connect = async () => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(uri).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
};
