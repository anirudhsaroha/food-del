import { placeOrder , userOrders , getOrder , updateStatus } from "../controllers/orderController.js";
import express from 'express'
import authMiddleWare from "../middlewares/auth.js";

const orderRouter = express.Router();

orderRouter.post("/place" , authMiddleWare, placeOrder );
orderRouter.post("/get", authMiddleWare , userOrders );
orderRouter.get("/getOrder",  getOrder );
orderRouter.patch("/update" , updateStatus );


export default orderRouter;