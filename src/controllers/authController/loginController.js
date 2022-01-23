import pool from "../../../db"
import { checkEmailExit } from "../../queries"
import Joi from "joi";

import CustomErrorHandler from "../../services/CustomErrorHandler";
import JwtService from "../../services/JwtService";


const loginController = {
    async login(req,res,next){

        const loginSchema = Joi.object({
            email:Joi.string().email().required(),
            password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        })
   
        const {error} =  loginSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const {email,password} = req.body
        try {
              await pool.query(checkEmailExit,[email],(err,results)=>{
                    if (err) {
                        return next(CustomErrorHandler.wrongCredential());
                    }
                   // console.log(results.rows[0])
                    const user = results.rows[0];
                    if (user.password !== password) {
                        return next(CustomErrorHandler.wrongCredential());
                    }
                    const access_token = JwtService.sign({id:user.id,name:user.name,email})
           
                    return res.json(access_token)
                }) 
        } catch (err) {
            return next(err)
        }
  
    },
}

export default loginController