import express from 'express'
import { addFood, listFood , removeFood , getFood } from '../controllers/foodController.js'
import multer from 'multer'

const foodRouter = express.Router();

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req, file , cb ) => {
        return cb( null, `${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage});

foodRouter.post("/add" , upload.single("image"), addFood ); 
foodRouter.get("/list" , listFood );
foodRouter.post("/get" , getFood );
foodRouter.delete("/remove" , removeFood );

export default foodRouter;