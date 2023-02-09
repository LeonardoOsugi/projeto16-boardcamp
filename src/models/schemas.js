import joi from "joi";

export const gamesSchemas = joi.object({
    name: joi.string().min(3).required(), 
    image: joi.required(), 
    stockTotal: joi.required(), 
    pricePerDay: joi.required()
})