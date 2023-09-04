import express from "express";
import dotenv from "dotenv";
import dbConnect from "./config/dbConnect.js";
import router from "./Routes/userRoute.js";

dotenv.config();
dbConnect();

const app = express();
const PORT = process.env.port || 8080;
app.use(express.json());
app.use('/users', router);

app.listen(PORT, ()=>{ console.log(`server running at ${PORT}`)});


