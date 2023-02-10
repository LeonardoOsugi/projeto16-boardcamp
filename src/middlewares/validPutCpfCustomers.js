import { db } from "../database/db.js";

export async function validPutCpfCustomers(req, res, next){
    const { id } = req.params;
    const { cpf } = req.body;

    const cpfExist = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf]);


        if(cpfExist.rows[0].id === id && cpfExist.rowCount > 0 ){
            res.sendStatus(409);
            return;
        };
    next();
};