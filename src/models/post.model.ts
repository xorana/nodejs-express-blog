import mongoose, { Schema, Document } from 'mongoose';

export interface IPost extends Document {
    title: string,
    time: Date
    content: [string]
}

const PostSchema: Schema = new Schema({
    title: {type: String, required: true},
    time: {type: Date, required: true, default: Date.now},
    content: {type: [String], required: true}
});

export default mongoose.model<IPost>('Post', PostSchema);