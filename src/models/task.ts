import mongoose, { Schema, model, Document } from 'mongoose';

export enum SocialPlatform {
    Twitter = 'twitter',
    Facebook = 'facebook',
    YouTube = 'youtube',
    Instagram = 'instagram'
}

export interface ITask extends Document {
    title: string;
    description: string;
    taskType: string;
    url?: string;
    socialPlatform?: SocialPlatform;
    rewardTokens: number;
    createdAt: Date;
}

const TaskSchema = new Schema<ITask>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String },
    socialPlatform: { 
        type: String, 
        enum: Object.values(SocialPlatform),
    },
    rewardTokens: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now }
});


export default mongoose.models.Task || model<ITask>('Task', TaskSchema);
