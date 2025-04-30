import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error(
    "⚠️ Please define the MONGO_URI environment variable inside .env.local"
  );
}

// Use globalThis directly without var
interface Cached {
  conn: mongoose.Connection | null;
  promise: Promise<mongoose.Mongoose> | null;
}

const cached: Cached = globalThis.mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGO_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

globalThis.mongoose = cached;

export default connectDB;
