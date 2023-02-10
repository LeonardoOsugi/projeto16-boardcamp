import { Router } from "express";
import { validateSchema } from "../middlewares/validSchema.js";
import { costumersSchemas } from "../models/schemas.js";
import { postCostumers } from "../controllers/customersControllers.js";
import { validCpfCustomers } from "../middlewares/validCpfCustomers.js";
const router = Router();


router.get("/customers");
router.get("/customers/:id");
router.post("/customers", validateSchema(costumersSchemas), validCpfCustomers, postCostumers);
router.put("/customers/:id");

export default router;