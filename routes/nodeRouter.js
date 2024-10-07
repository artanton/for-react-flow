import express from "express";
import nodeController from "../controllers/nodeControllers.js";
import {
  createNodeSchema,
  updateNodeSchema,
  pictureSchema,
 
} from "../schemas/nodeSchemas.js";
import validateBody from "../decorators/validateBody.js";
import isValidId from "../middlewares/isValidId.js";


const nodeRouter = express.Router();



nodeRouter.get("/", nodeController.getAllNodes);



nodeRouter.post(
  "/",
  validateBody(createNodeSchema),
  nodeController.createNode
);
nodeRouter.get(
  "/:id",
  nodeController.getNode
);

nodeRouter.patch(
  "/:id",  
  validateBody(updateNodeSchema),
  nodeController.updateNode
);

nodeRouter.put(
  "/id",
  validateBody(pictureSchema),
)

nodeRouter.delete("/:id", nodeController.deleteNode);


export default nodeRouter;
