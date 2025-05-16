// models/File.ts
import mongoose from 'mongoose';

const fileSchema = new mongoose.Schema({
  fileName: String,
  fileUrl: String,
  uploadedBy: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.File || mongoose.model('File', fileSchema);
