import { db } from "../database/db.js";

export async function validCpfCustomers(req, res, next){
    const { cpf } = req.body;

    const cpfExist = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf]);

    if(cpfExist.rowCount > 0 ){
        res.sendStatus(409);
        return;
    };
    next();
};