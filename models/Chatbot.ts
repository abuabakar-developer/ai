import mongoose from 'mongoose';

const chatbotSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  language: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

export default mongoose.models.Chatbot || mongoose.model('Chatbot', chatbotSchema);
