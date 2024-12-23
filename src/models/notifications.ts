import { Schema, model, Document, Types } from 'mongoose';

export interface INotification extends Document {
    title: string;
    description: string;
    time: Date;
    icon: string;
    isRead: boolean;
    userId: Types.ObjectId;
}

const NotificationSchema = new Schema<INotification>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    time: { type: Date, default: Date.now },
    icon: { type: String, required: false },
    isRead: { type: Boolean, default: false },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
}, {timestamps: true});

export default model<INotification>('Notification', NotificationSchema);