import { db } from "../database/db.js";

export async function validAlreadyFinishedRentals(req, res, next){
    const {id} = req.params;
    const listaRentals = await db.query(`SELECT * FROM rentals`,[id]);

    if(listaRentals.rows[0].returnDate !== null){
        return res.sendStatus(400);
    };
    next();
};