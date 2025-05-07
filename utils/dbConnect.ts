import mongoose from "mongoose";

// Ensure that the environment variable is always defined
const MONGO_URI: string = process.env.MONGO_URL as string;

if (!MONGO_URI) {
  throw new Error("Please define the MONGO_URL environment variable inside .env.local");
}

// Augment the NodeJS.Global interface to include mongoose
declare global {
  // eslint-disable-next-line no-var, vars-on-top
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Connection> | null };
}

// Use a cached object in the global scope
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  // If a cached connection exists, return it
  if (cached.conn) {
    return cached.conn;
  }

  console.log("Attempting to connect to MongoDB with URI:", MONGO_URI);

  // Create a new connection if no promise exists
  if (!cached.promise) {
    cached.promise = mongoose
      .connect(MONGO_URI)
      .then((mongooseInstance) => {
        console.log("MongoDB connected successfully");
        return mongooseInstance.connection;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw new Error("MongoDB connection failed");
      });
  }

  // Wait for the connection to establish and cache it
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;

