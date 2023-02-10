import joi from "joi";

export const gamesSchemas = joi.object({
    name: joi.string().min(3).required(), 
    image: joi.required(), 
    stockTotal: joi.required(), 
    pricePerDay: joi.required()
});

export const costumersSchemas = joi.object({
    name: joi.string().min(3).required(), 
    phone: joi.string().min(10).max(11).required(), 
    cpf: joi.string().min(11).max(11).required(), 
    birthday: joi.date().required()
})