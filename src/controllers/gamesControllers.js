import { db } from "../database/db.js";


export async function getGames(req, res){
    try{
        const gamesList = await db.query("SELECT * FROM games");
        
        res.send(gamesList.rows);
    }catch(err){
        res.status(500).send(err.message);
    }

};

export async function postGames(req, res){
    const { name, image, stockTotal, pricePerDay } = req.body;
    try{
        await db.query(`INSERT INTO games (name, image, "stockTotal", "pricePerDay") VALUES ($1, $2, $3, $4)`,[name, image,stockTotal, pricePerDay]);

        res.send(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}