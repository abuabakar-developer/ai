import mongoose from 'mongoose';

const QnASchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    email: { type: String, required: true }, // associate with user
  },
  { timestamps: true }
);

export default mongoose.models.QnA || mongoose.model('QnA', QnASchema);
