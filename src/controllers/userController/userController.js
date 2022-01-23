import pool from "../../../db"
import { getUserFollowed,getUserFollowing } from "../../queries"


const userController = {
      async getUser(req,res,next){
        
        try {     
            let following;
            let followed;
            const resultsFollowed = await pool.query(getUserFollowed,[req.user.id])
            const resultFollowing =  await pool.query(getUserFollowing,[req.user.id])          
            let data = {
                name:req.user.name,
                followed:resultsFollowed.rows.length,
                following:resultFollowing.rows.length
            }
            res.json(data)
      } catch (err) {
          return next(err)
      }
     }

}

export default userController