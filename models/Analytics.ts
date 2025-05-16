// models/Analytics.ts
import mongoose from 'mongoose';

const AnalyticsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  totalChats: { type: Number, default: 0 },
  uniqueUsers: { type: Number, default: 0 },
  peakTime: { type: String },
  emailCaptures: { type: Number, default: 0 },
  activityData: [
    {
      name: String, // time label (e.g., "10 AM")
      chats: Number,
    },
  ],
  commonQuestionsData: [
    {
      name: String, // e.g., "Pricing"
      value: Number,
    },
  ],
}, { timestamps: true });

export default mongoose.models.Analytics || mongoose.model('Analytics', AnalyticsSchema);
