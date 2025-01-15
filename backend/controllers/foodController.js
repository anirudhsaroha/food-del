import fs from 'fs'
import { db } from '../config/db.js';

const addFood = async ( req, res ) => {
    console.log(req);
    
    const image_filename = `${req.file.filename}`;

    const name = req.body.name;
    const description = req.body.description;
    const price = req.body.price;
    const category = req.body.category;
    const image = image_filename;
    
    try{
        const query = `
            INSERT INTO food (name, description, price, image, category)
            VALUES ($1, $2, $3, $4, $5) RETURNING *;
        `;

        const values = [name, description, price, image, category];
        const result = await db.query(query, values);

        res.status(201).json({
            message: "Food item added successfully!",
            food: result.rows[0],
        });
    }
    catch(error){
        console.error("Error inserting data:", error);
        res.status(500).json({ message: "Failed to add food item." });
    }

}

const listFood = async (req, res) => {
    try{
        const foods = await db.query('SELECT * FROM public.food' );
        res.json({success:true, data:foods})
    }
    catch(error){
        console.log(error);
        res.json({success:false , message:'Error'})
    }
}

const removeFood = async ( req , res ) => {
    console.log(req.body.id);
    console.log("cutie patootie");
    const id = req.body.id;
    try{
        const foods = await db.query('DELETE FROM food WHERE id = $1 RETURNING *', [id])
        fs.unlink(`uploads/${foods.image}`, () => {})
        res.json({success:true , data:foods})
    }
    catch(error){
        console.log(error);
        res.json({success:false , message:"Error"})
    }
}

const getFood = async (req, res) => {
    try {
        let word = req.body.word;

        const results = await db.query(
            'SELECT * FROM food WHERE name ILIKE $1', 
            [`%${word}%`]
        );

        res.json({ success: true, data: results.rows });
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: 'An error occurred' });
    }
};


export {addFood , listFood , removeFood , getFood }