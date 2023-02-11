import { Router } from "express";
import { postRentals } from "../controllers/rentalsControllers.js";
import { validateSchema } from "../middlewares/validSchema.js";
import { rentalSchemas } from "../models/schemas.js";
import { validBodyRentals } from "../middlewares/validBodyRentals.js";

const router = Router();

router.get("/rentals");
router.post("/rentals", validateSchema(rentalSchemas), validBodyRentals,postRentals);
router.post("/rentals/:id/return");
router.delete("/rentals/:id");

export default router;