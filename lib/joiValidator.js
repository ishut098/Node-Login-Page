const Joi = require('joi')
exports.userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(3).max(12).required()
})
exports.userApiSchema = Joi.object({
  email: Joi.string().email().required(),
  name: Joi.string().required()
})
exports.userRegisterSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(3).max(12).required(),
  name: Joi.string().required(),
  phone: Joi.number().required(),
  isAdmin: Joi.boolean().required()
})
exports.getUsers = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(3).max(12).required()
})
exports.getUsersById = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().min(3).max(12).required()
})
