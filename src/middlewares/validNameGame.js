import { db } from "../database/db.js";

export async function validNameGame(req, res, next){
    const {name} = req.body;

    const nomeExist = await db.query(`SELECT * FROM games WHERE name = $1`,[name]);

    if(nomeExist.rowCount > 0){
        res.sendStatus(409);
        return;
    };
    next();
};