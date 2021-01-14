import mongoose, { Schema, Document } from 'mongoose';

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface IPost extends Document {
    title: string;
    urlId: string;
    time: Date;
    content: [string];
}

const PostSchema: Schema = new Schema({
    title: {type: String, required: true},
    urlId: {type: String, required: true},
    time: {type: Date, required: true, default: Date.now},
    content: {type: [String], required: true}
});

export default mongoose.model<IPost>('Post', PostSchema);