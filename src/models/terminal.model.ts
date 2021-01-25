import mongoose, { Schema, Document } from 'mongoose';

export interface Output {
    output: string | string[];
}

export interface Command {
    input: string;
    outputs: Output[];
}

interface CommandSchema extends Command, Document {}

const CommandSchema: Schema = new Schema({
    input: {type: String, required: true},
    outputs: [{
        output: [String]
    }]
})

export default mongoose.model<CommandSchema>('Terminal', CommandSchema);