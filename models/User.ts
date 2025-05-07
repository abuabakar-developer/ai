// models/User.ts
import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    businessName: { type: String }, // ✅ Added
    resetToken: String,
    resetTokenExpiry: Date,
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', UserSchema);
