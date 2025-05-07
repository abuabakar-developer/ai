// lib/db.ts
import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('❌ MONGO_URI is not defined in environment variables!');
}

export const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(MONGO_URI);
};


