import { db } from "../database/db.js";

export async function postCostumers(req, res){
    const {name, phone, cpf, birthday} = req.body;

    try{
        await db.query(`INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4)`, [name, phone, cpf, birthday]);
    
        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
};

export async function getCustomers(req, res){
    try{
        const listaClientes = await db.query("SELECT * FROM customers");
        
        res.send(listaClientes.rows);
    }catch(err){
        res.status(500).send(err.message);
    }
};

export async function getIdCustomers(req, res){
    const {id} = req.params;

    try{
        const listaClienteId = await db.query(`SELECT * FROM customers WHERE id = $1`, [id]); 

        if(listaClienteId.rowCount === 0 ){
            return res.sendStatus(404);
        }

        res.send(listaClienteId.rows);
    }catch(err){
        res.status(500).send(err);
    }
}