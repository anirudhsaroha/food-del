import { db } from "../config/db.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import validator from 'validator'


const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const loginUser = async (req, res) => {
    const email = req.body.username;
    const password = req.body.password;

    try{
        const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
            email,
          ]);
        if( checkResult.rows.length > 0 ){
            const user = checkResult.rows[0];

            const isPasswordMatch = await bcrypt.compare(password, user.password);
            if (!isPasswordMatch) {
                return res.json({ success: false, message: "Invalid credentials" });
            }

            const token = createToken(user.id);
            return res.json({success:true, token });
        }
        else{
            return res.json({success:false , message:"User does not exists"});
        }
    }
    catch(error){
        console.log(error);
        res.json({success:false , message:"Error while logging"});
    }
};

const registerUser = async (req, res) => {
    console.log(req.body);
    const email = req.body.username;
    const password = req.body.password;
    const name = req.body.name;
    console.log("here");
  
    try {
      const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
        email,
      ]);
  
      if (checkResult.rows.length > 0) {
            return res.json({success:false , message:"User already exists"});
      }
      else {
            if( !validator.isEmail(email) ){
                return res.json({success:false , message:"Please enter a valid email"});
            }
            if( password.length < 8 ){
                return res.json({success:false , message:"Please enter a strong Password"});
            }
            
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            try{
                const result = await db.query("INSERT INTO users (name , email, password) VALUES ($1, $2, $3) RETURNING *",[name , email, hashedPassword]);
                const token = createToken(result.rows[0].id);
                res.json({success:true, token});
            }
            catch(error){
                console.log(error);
                res.json({success:false, message:"Error"});
            }

      }
    } catch (err) {
      console.log(err);
    }
};

export {loginUser, registerUser}