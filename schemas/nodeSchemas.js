import Joi from "joi";

export const createNodeSchema = Joi.object({
  id:Joi.string().required(),
  type: Joi.string().required(),
  data: Joi.object({
    label: Joi.string().required(),
  }),

  position: Joi.object({
    x: Joi.number().required(),
    y: Joi.number().required(),
  }),
  selected: Joi.boolean().required(),
  dragging: Joi.boolean().required(),
});

export const updateNodeSchema = Joi.object({
  position: Joi.object({
    x: Joi.number(),
    y: Joi.number(),
  }),
data:Joi.object({
  label: Joi.string(), 
}),
  
});

export const pictureSchema = Joi.object({
  fileURL: Joi.string().regex(/\.(jpg|jpeg|png)$/i),
});
