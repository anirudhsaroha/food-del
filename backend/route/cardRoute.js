import express from 'express'
import authMiddleWare from '../middlewares/auth.js';
import { addToCart , removeFromCart , getCart , emptyCart } from '../controllers/cartController.js'

const cartRouter = express.Router();

cartRouter.post('/add', authMiddleWare,  addToCart );
cartRouter.post('/remove' , authMiddleWare,  removeFromCart ); 
cartRouter.post('/get', authMiddleWare, getCart ); 
cartRouter.post('/empty' , authMiddleWare , emptyCart );

export default cartRouter;