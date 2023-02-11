import { db } from "../database/db.js";

export async function validBodyRentals(req, res, next){
    const {customerId, gameId, daysRented} = req.body;

    const clienteExist = await db.query(`SELECT * FROM customers WHERE id = $1`, [customerId]);

    const jogoExist = await db.query(`SELECT * FROM games WHERE id = $1`, [gameId]);

    if(clienteExist.rowCount === 0 || jogoExist.rowCount === 0 || daysRented <= 0){
        res.sendStatus(400);
    };

    next();
}