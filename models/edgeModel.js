
import {model, Schema} from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const edgeSchema = new Schema (
    {
        id: {
            type: String,
            required: [true],
        },
        source: {
            type: String,
            required: [true, "Edge has no source"],
        },
        target: {
            type: String,
            required:[true, "Edge has no target"],
        },
        label: {
            type: String           
        },

        animated:{
            type: Boolean,
            required: true,           
        },
        type: {
            type: String,
            required: true,
        },
        sourceHandle:{
            type: String,
            required: true,
        },
        targetHandle:{
            type: String,
            required: true,
        }


    },
    {versionKey: false, timestamps: true}
);
edgeSchema.post("save", handleSaveError);
edgeSchema.pre("findOneAndUpdate", setUpdateSettings);
edgeSchema.post("findOneAndUpdete", handleSaveError);

const Edge = model ("edge", edgeSchema);
export default Edge;













