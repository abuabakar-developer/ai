// models/ChatbotSetting.ts
import mongoose, { Schema, model, models } from 'mongoose';

const ChatbotSettingSchema = new Schema({
  botName: { type: String, default: 'Talksy' },
  welcomeMessage: { type: String, default: 'Hi there! How can I help you today?' },
  position: { type: String, enum: ['bottom-right', 'bottom-left'], default: 'bottom-right' },
  theme: { type: String, enum: ['light', 'dark'], default: 'light' },
  bubbleColor: { type: String, default: '#2563eb' },
}, { timestamps: true });

const ChatbotSetting = models.ChatbotSetting || model('ChatbotSetting', ChatbotSettingSchema);

export default ChatbotSetting;
