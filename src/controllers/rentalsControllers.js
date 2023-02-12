import { db } from "../database/db.js";
import dayjs from "dayjs";

export async function postRentals(req, res){
    const { customerId, gameId, daysRented} = req.body;

    try{
        const stockGame = await db.query(`SELECT "stockTotal" FROM games WHERE id = $1`, [gameId]);
        const stocks = await db.query(`SELECT COUNT(*) FROM rentals WHERE "gameId" = $1 AND "returnDate" IS NULL`, [gameId]);

        if(stockGame.rows[0].stockTotal <= stocks.rows[0].count){
            return res.status(400).send({message: "é esse mesmo ;)"});
        }

        await db.query(`INSERT INTO rentals ("customerId", "gameId", "rentDate", "daysRented", "originalPrice") SELECT $1, $2, $3, $4,  $5 * (SELECT "pricePerDay" FROM games WHERE id = $6) WHERE EXISTS (
        SELECT * FROM customers WHERE id = $7) AND EXISTS ( SELECT * FROM games WHERE id = $8 ) AND ( SELECT "stockTotal" FROM games WHERE id = $9 ) > ( SELECT COUNT(*) FROM rentals WHERE "gameId" = $10 AND "returnDate" IS NULL )`,[customerId, gameId, dayjs().locale("pt").format("YYYY-MM-DD"), daysRented, daysRented,gameId, customerId, gameId, gameId, gameId]);

        res.sendStatus(201);

    }catch(err){
        res.status(500).send(err.message);
    }
};

export async function getRentals(req, res){
    try{
        const listRentals = await db.query(`SELECT rentals.*,JSON_BUILD_OBJECT('id', customers.id,'name', customers.name) AS customer, JSON_BUILD_OBJECT('id', games.id, 'name', games.name) AS game FROM rentals JOIN customers ON rentals."customerId" = customers.id JOIN games ON rentals."gameId" = games.id `);

        console.log(listRentals.rows)

        res.send(listRentals.rows)
    }catch(err){
        res.status(500).send(err.message);
    }
};

export async function postFinalizarRentals(req, res){
    const {id} = req.params;
    try{
        // let delayFee = 0;
        
        // const listaRentals = await db.query(`SELECT * FROM rentals WHERE id = $1`, [id]);
        // const tempoFinal = new Date().getTime() - new Date(listaRentals.rows[0].rentDate).getTime();
        // const diasConcluidos = Math.floor(tempoFinal / (24 * 3600 * 1000));
        // const diasAlugados = listaRentals.rows[0].daysRented;

        // if(diasConcluidos > diasAlugados){
        //     const payDay = diasConcluidos - diasAlugados;
        //     delayFee = payDay * listaRentals.rows[0].originalPrice;
        // }
        await db.query(`UPDATE rentals SET "returnDate" = $1, "delayFee" = (
            SELECT "pricePerDay"
            FROM games
            WHERE id = rentals."gameId"
          ) * GREATEST(0, DATE_PART('day', $2::timestamp - "rentDate"::timestamp) - "daysRented")
          WHERE id = $3
          AND "returnDate" IS NULL`, [dayjs().locale("pt").format("YYYY-MM-DD"), dayjs().locale("pt").format("YYYY-MM-DD"), id]);

        res.sendStatus(200);
    }catch(err){
        res.status(500).send(err.message);
    }
}