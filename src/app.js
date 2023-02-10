import express from "express";
import cors from "cors";
import dotenv from  "dotenv";
import gamesRoutes from "./routes/gamesRoutes.js";
import customersRoutes from "./routes/customersRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(gamesRoutes);
app.use(customersRoutes);

app.listen(5000, () => console.log(`runing in port: ${5000}`));
