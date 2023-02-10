import { db } from "../database/db.js";

export async function validPutCpfCustomers(req, res, next){
    const { id } = req.params;
    const { cpf } = req.body;

    const cpfExist = await db.query(`SELECT * FROM customers WHERE cpf = $1`, [cpf]);


        if(cpfExist.rowCount > 0 ){
            if(cpfExist.rows[0].id !== Number(id)){
                res.sendStatus(409);
                return;
            }
        };
    next();
};