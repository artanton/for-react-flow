import {model, Schema} from 'mongoose';
import { handleSaveError, setUpdateSettings } from './hooks.js';

const nodeSchema = new Schema({
  id: {
    type: String,
    required: [true],
  },
  type: {
    type: String,
    required: [true, 'Node has no "type" field'],
  },
  data:{
    label:{ type: String},
    fileURL: {type: String},
  },
  position: {
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  selected: {
    type: Boolean,
    required: [true, 'Node has no "selected" field,'],
    default: false
  },
  dragging: {
    type: Boolean,
    required: [true, 'Node has no "dragging" field'],
    default: false
  },
},
{versionKey: false, timestamps: true}
);
nodeSchema.post("save", handleSaveError);
nodeSchema.pre("findOneAndUpdate", setUpdateSettings);
nodeSchema.post("findOneAndUpdete", handleSaveError);

const Node = model("node", nodeSchema);
export default Node;
