
import Edge from "../models/edgeModel.js";
import Node from "../models/nodeModel.js";
import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";
import {listEdges} from "./edgesServices.js";
import HttpError from "../helpers/HttpError.js";

const picPath = path.resolve("public", "pictures");
const toDelPath = path.resolve("public");

export const listNodes = () => Node.find();

export const findNode = (id) =>{
  
const res = Node.findOne(id);
return res;
}

export const createNode = async (data) => {
  const newNode = await Node.create(data);
  return newNode;
};

export const updateNode = async(id, data) =>{
   
  const result = await Node.findOneAndUpdate(
    id, 
    data
  );
 
return result;}

export const pictureUpdate = async (data) => {
  const { id, oldPath, filename } = data;
  
  const node = await Node.findOne({id}); 
  if(!node){
    throw HttpError(404, 'Not found');
  }
  const image = await Jimp.read(oldPath);
  // image.resize(480, 480).write(oldPath);
  
  const newPath = path.join(picPath, filename);
  
  await fs.rename(oldPath, newPath);

  const newPic = path.join("pictures", filename);
  

    
  if(node.data.fileURL){ 
    const oldPic = path.join(toDelPath, node.data.fileURL);

    await fs.rm(oldPic);}


  await Node.findOneAndUpdate({ id }, {'data.fileURL': newPic });

  return { newPic };
};

export const removePicture = async (id)=>{
  const node = await Node.findOne({id}); 
  if(!node){
    throw HttpError(404, 'Not found');
  }
  if(node.data.fileURL){ 
    const oldPic = path.join(toDelPath, node.data.fileURL);

    await fs.rm(oldPic);}
    
    await Node.findOneAndUpdate({ id }, {'data.fileURL': ""});

};

export const removeNode = async(id)=> {  
  const lstOfEdge = await listEdges();
 
  const targetEdges = lstOfEdge.filter((edge)=>edge.target===id);
  const sourceEdges = lstOfEdge.filter((edge)=>edge.source===id);
  if(targetEdges){
  targetEdges.map(async(targetEdge)=> await Edge.findByIdAndDelete(targetEdge.id));}
  if(sourceEdges){
  sourceEdges.map(async(sourceEdge)=> await Edge.findByIdAndDelete(sourceEdge.id));}
  const result = await Node.findOneAndDelete(id);
return result;
};