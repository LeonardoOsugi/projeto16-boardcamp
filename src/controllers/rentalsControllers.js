import { db } from "../database/db.js";
import dayjs from "dayjs";

export async function postRentals(req, res){
    const { customerId, gameId, daysRented} = req.body;

    try{
        const precoGame = await db.query(`SELECT ("pricePerDay") FROM games WHERE id = $1`, [gameId]);

        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "returnDate", "originalPrice", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);`,[customerId, gameId, dayjs().locale("pt").format("YYYY-MM-DD"), daysRented, null, daysRented*precoGame.rows[0].pricePerDay, null]);

        res.sendStatus(201);

    }catch(err){
        res.status(500).send(err.message);
    }
}