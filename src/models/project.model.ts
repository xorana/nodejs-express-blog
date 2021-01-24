import mongoose, { Schema, Document } from 'mongoose';

export interface Project {
    title: string;
    image: string;
    description: string;
    skills: string[];
    demoLink?: string;
    sourceLink: string;
}

interface ProjectSchema extends Project, Document {}

const ProjectSchema: Schema = new Schema({
    title: {type: String, required: true},
    image: {type: String, required: true},
    description: {type: String, required: true},
    skills: {type: [String], required: true},
    demoLink: {type: String, required: false},
    sourceLink: {type: String, required: true}
})

export default mongoose.model<ProjectSchema>('Project', ProjectSchema);