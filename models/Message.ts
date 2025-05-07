import mongoose, { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema({
  from: { type: String, required: true },
  text: { type: String, required: true },
  userId: { type: String, required: true }, // <- user ID for tracking
}, { timestamps: true });

const Message = models.Message || model("Message", MessageSchema);

export default Message;
