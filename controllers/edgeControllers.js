import * as edgeService from "../services/edgesServices.js";

import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllEdges = async (req, res) => {
 
  const result = await edgeService.listEdges();
  res.json(result);
};

const createEdge = async (req, res) => {
  const result = await edgeService.addEdge({ ...req.body});

  res.status(201).json(result);
};

const updateEdge = async (req, res) => {
   const data = req.body;
   const { id } = req.params;

  const result = await edgeService.updateEdgeById(
    {id:id},
    data
  );
  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json(result);
};

const deleteEdge = async (req, res) => {
  const { id } = req.params;
  const result = await edgeService.removeEdge(id);

  if (!result) {
    throw HttpError(404, `Not found`);
  }
  res.json({id, message: "Delete success" });
};

export default {
  getAllEdges: ctrlWrapper(getAllEdges),
  createEdge: ctrlWrapper(createEdge),
  updateEdge: ctrlWrapper(updateEdge),
  deleteEdge: ctrlWrapper(deleteEdge),
};
