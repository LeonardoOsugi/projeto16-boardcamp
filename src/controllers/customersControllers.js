import { db } from "../database/db.js";

export async function postCostumers(req, res){
    const {name, phone, cpf, birthday} = req.body;

    try{
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
    
        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}