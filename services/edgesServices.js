
import Edge from "../models/edgeModel.js";


export const listEdges = () => Edge.find();

export const addEdge = async (data) => {
  const newEdge = await Edge.create(data);
  return newEdge;
};

export const updateEdgeById = (filter, data) =>
  Edge.findOneAndUpdate(filter, data);

export const removeEdge = (id)=> Edge.findOneAndDelete(id);
