import mongoose, { Schema, models } from 'mongoose';

const FileSchema = new Schema({
  name: String,
  size: Number,
  uploadedBy: String,
  uploadedAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.File || mongoose.model('File', FileSchema);
