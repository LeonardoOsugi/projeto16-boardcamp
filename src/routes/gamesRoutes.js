import { Router } from "express";
import { validStockToTalEPricePerDay } from "../middlewares/validStockToTalEPricePerDay.js";
import { getGames, postGames } from "../controllers/gamesControllers.js";
import { validateSchema } from "../middlewares/validSchema.js";
import { gamesSchemas } from "../models/schemas.js";
import { validNameGame } from "../middlewares/validNameGame.js";

const router = Router();

router.get("/games", getGames);
router.post("/games", validateSchema(gamesSchemas), validStockToTalEPricePerDay, validNameGame, postGames);

export default router;