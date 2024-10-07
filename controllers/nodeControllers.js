import * as nodeService from "../services/nodesServices.js"
import HttpError from "../helpers/HttpError.js";
import ctrlWrapper from "../decorators/ctrlWrapper.js";

const getAllNodes = async (req, res) => {
    const result = await nodeService.listNodes();
    res.json(result);

};

const getNode = async (req, res) => {
    const id =req.params;

    const result = await nodeService.findNode(id);
    if (!result){
        throw HttpError(404, 'Not found');
    }
    res.json(result);

};

const createNode = async (req, res)=>{
    const result = await nodeService.createNode({...req.body});
    res.status(201).json(result);
};

const updateNode = async (req, res)=>{
  const data = req.body;  
  const id =req.params;

const result = await nodeService.updateNode(
    id,
     data
    );
 
if (!result){
    throw HttpError(404, 'Not found');
}
res.json(result);
};

const updatePicture = async (req, res) => {
    
    const { id } = req.params;
    const { path: oldPath, filename } = req.file;
  
    if (!req.file) {
      throw HttpError(401, "There is no data to update");
    }
  
    const data = { id,  oldPath, filename };
  
    const newPicture = await nodeService.pictureUpdate(data);
  
    res.status(200).json(newPicture);
  };

  


const deleteNode = async (req, res)=>{
    const id= req.params;
    
    const result = await nodeService.removeNode(id);
    if (!result){
        throw HttpError(404, 'Not found');
    };
    res.json({message: "Delete success"});
}

export default {
    getAllNodes: ctrlWrapper(getAllNodes),
    getNode: ctrlWrapper(getNode),
    createNode: ctrlWrapper(createNode),
    updateNode: ctrlWrapper(updateNode),
    deleteNode: ctrlWrapper(deleteNode),
    updatePicture: ctrlWrapper(updatePicture),
    
};