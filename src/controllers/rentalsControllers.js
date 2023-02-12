import { db } from "../database/db.js";
import dayjs from "dayjs";

export async function postRentals(req, res){
    const { customerId, gameId, daysRented} = req.body;

    try{
        const stockGame = await db.query(`SELECT "stockTotal" FROM games WHERE id = $1`, [gameId]);
        const stocks = await db.query(`SELECT COUNT(*) FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`, [gameId]);

        if(stockGame.rows[0].stockTotal < stocks.rows[0].count){
            return res.status(400).send({message: "é esse mesmo ;)"});
        }

        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") SELECT $1, $2, $3, $4,  $5 * (SELECT "pricePerDay" FROM games WHERE id = $6) WHERE EXISTS (
        SELECT * FROM customers WHERE id = $7) AND EXISTS ( SELECT * FROM games WHERE id = $8 ) AND ( SELECT "stockTotal" FROM games WHERE id = $9 ) > ( SELECT COUNT(*) FROM rentals WHERE "gameId" = $10 AND "returnDate" IS NULL )`,[customerId, gameId, dayjs().locale("pt").format("YYYY-MM-DD"), daysRented, daysRented,gameId, customerId, gameId, gameId, gameId]);

        res.sendStatus(201);

    }catch(err){
        res.status(500).send(err.message);
    }
}