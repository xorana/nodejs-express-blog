import mongoose, { Schema, Document } from 'mongoose';

export interface Post {
    title: string;
    id: string;
    time: Date | string;
    content: string[] | string;
}

export interface FormattedPost extends Post {
    time: string;
}

const formatDate = (date: Date): string => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const day = date.getDate().toString();
    const month = months[date.getMonth()]
    const year = date.getFullYear().toString();

    return `${day} ${month}, ${year}`;
}

export class PostObject implements Post {
    title: string;
    id: string;
    time: Date | string;
    content: string[] | string;

    static getPreview(post: Post): Post {
        return {
            title: post.title,
            id: post.id,
            time: post.time instanceof Date ? formatDate(post.time) : post.time,
            content: [post.content[0]]
        }
    }

    static getFormatted(post: Post): FormattedPost {
        return {
            title: post.title,
            id: post.id,
            time: post.time instanceof Date ? formatDate(post.time) : post.time,
            content: post.content
        }
    }
}

interface PostSchema extends Post, Document {
    title: string;
    id: string;
    time: Date;
    content: string[];
}

const PostSchema: Schema = new Schema({
    title: {type: String, required: true},
    id: {type: String, required: true, unique: true},
    time: {type: Date, required: true, default: Date.now},
    content: {type: [String], required: true}
});

export default mongoose.model<PostSchema>('Post', PostSchema);