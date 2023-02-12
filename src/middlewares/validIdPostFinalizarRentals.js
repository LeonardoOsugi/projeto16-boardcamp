import { db } from "../database/db.js";

export async function validIdPostFinalizarRentals(req, res, next){
    const {id} = req.params;
    const listaRentals = await db.query(`SELECT * FROM rentals WHERE id = $1`,[id]);

    if(listaRentals.rowCount === 0 ){
        return res.sendStatus(404);
    }
    next();
}