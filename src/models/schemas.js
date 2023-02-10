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
    cpf: joi.string().regex(/^[0-9]{11}$/), 
    birthday: joi.date().required()
})