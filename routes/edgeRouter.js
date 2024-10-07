import express from 'express';

import edgeControllers from '../controllers/edgeControllers.js';
import validateBody from '../decorators/validateBody.js';
import { createEdgeSchema, updateEdgeSchema } from '../schemas/edgeSchemas.js';


const edgeRouter = express.Router();

edgeRouter.get("/", edgeControllers.getAllEdges);

edgeRouter.post(
    "/",
    validateBody(createEdgeSchema), 
    edgeControllers.createEdge);

edgeRouter.patch(
    "/:id",
    validateBody(updateEdgeSchema),
    edgeControllers.updateEdge);

edgeRouter.delete("/:id",  edgeControllers.deleteEdge);

export default edgeRouter;