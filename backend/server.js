import express from "express"
import cors from 'cors'
import { db } from "./config/db.js";
import foodRouter from "./route/foodRoute.js";
import userRouter from "./route/userRoute.js";
import cartRouter from "./route/cardRoute.js";
import 'dotenv/config'
import orderRouter from "./route/orderRoute.js";

const app = express();
const port = process.env.PORT || 4000;

db.connect();

app.use(cors())
app.use(express.json())

app.use("/api/food", foodRouter);
app.use("/images", express.static('uploads'));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter );

app.get("/" , (req, res) => {
    res.send("API is working");
} )

app.listen( port, () => {
    console.log('server is running on the port 4000');
});