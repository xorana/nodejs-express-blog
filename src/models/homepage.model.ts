import mongoose, { Schema, Document } from 'mongoose';

export interface Homepage {
    name: string;
    description: string;
}

interface HomepageSchema extends Homepage, Document {}

const HomepageSchema: Schema = new Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}
})

export default mongoose.model<HomepageSchema>('Homepage', HomepageSchema);