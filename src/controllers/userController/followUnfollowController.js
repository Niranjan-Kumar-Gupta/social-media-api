import pool from "../../../db"
import { addFollowUser, unfollowuser } from "../../queries"


const followUnfollowController = {
     follow(req,res,next){
       
         try {
            pool.query(addFollowUser,[req.user.id,req.params.id],(err,results)=>{
                if (err) {
                    return next(err);           
                }
                res.json({"status":1})
            })
             
         } catch (error) {
             return next(error);
         }
    },
    unfollow(req,res,next){
        try {
            pool.query(unfollowuser,[req.user.id,req.params.id],(err,results)=>{
                if (err) {
                    return next(err);           
                }
                res.json({"status":1})
            })
             
         } catch (error) {
             return next(error);
         }
    }

}

export default followUnfollowController