import { Router } from "express";
import { postRentals } from "../controllers/rentalsControllers.js";
import { validateSchema } from "../middlewares/validSchema.js";
import { rentalSchemas } from "../models/schemas.js";
import { validBodyRentals } from "../middlewares/validBodyRentals.js";
import { getRentals } from "../controllers/rentalsControllers.js";
import { postFinalizarRentals } from "../controllers/rentalsControllers.js";
import { validIdPostFinalizarRentals } from "../middlewares/validIdPostFinalizarRentals.js";
import { validAlreadyFinishedRentals } from "../middlewares/validAlreadyFinishedRentals.js";
import { deleteRentals } from "../controllers/rentalsControllers.js";

const router = Router();

router.get("/rentals", getRentals);
router.post("/rentals", validateSchema(rentalSchemas), validBodyRentals ,postRentals);
router.post("/rentals/:id/return", validIdPostFinalizarRentals , validAlreadyFinishedRentals, postFinalizarRentals);
router.delete("/rentals/:id", validIdPostFinalizarRentals , validAlreadyFinishedRentals, deleteRentals);

export default router;