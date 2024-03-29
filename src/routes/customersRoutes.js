import { Router } from "express";
import { validateSchema } from "../middlewares/validSchema.js";
import { costumersSchemas } from "../models/schemas.js";
import { postCostumers, getCustomers, getIdCustomers, putCustomers} from "../controllers/customersControllers.js";
import { validCpfCustomers } from "../middlewares/validCpfCustomers.js";
import { validPutCpfCustomers } from "../middlewares/validPutCpfCustomers.js";
const router = Router();


router.get("/customers", getCustomers);
router.get("/customers/:id", getIdCustomers);
router.post("/customers", validateSchema(costumersSchemas), validCpfCustomers, postCostumers);
router.put("/customers/:id",validateSchema(costumersSchemas),validPutCpfCustomers, putCustomers);

export default router;