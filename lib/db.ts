import mongoose, { Mongoose } from "mongoose";

// Type for the cached variable
interface Cached {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error(
    "⚠️ Please define the MONGO_URI environment variable inside .env.local"
  );
}

// Type the global object properly instead of using 'any'
declare global {
  var mongoose: Cached | undefined;
}

const cached: Cached = global.mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongooseInstance) => {
      return mongooseInstance;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

global.mongoose = cached;

export default connectDB;
