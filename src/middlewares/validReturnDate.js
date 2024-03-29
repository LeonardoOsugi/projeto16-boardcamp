import { db } from "../database/db.js";

export async function validReturnDate(req, res, next){
    const {id} = req.params;
    const listaRentals = await db.query(`SELECT * FROM rentals WHERE id = $1`,[id]);

    if(listaRentals.rows[0].returnDate === null){
        return res.sendStatus(400);
    };
    next();
};