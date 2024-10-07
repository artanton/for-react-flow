import Joi from "joi";

export const createEdgeSchema = Joi.object({
  id: Joi.string().required(),
  source: Joi.string().required(),
  target: Joi.string().required(),
  animated: Joi.boolean().required(),
  label: Joi.string().required(),
  type: Joi.string().required(),
  sourceHandle: Joi.string().required(),
  targetHandle: Joi.string().required(),
});

export const updateEdgeSchema = Joi.object({
  target: Joi.string(),
  animated: Joi.boolean(),
  label: Joi.string(),
  type: Joi.string(),
  targetHandle: Joi.string(),
});
