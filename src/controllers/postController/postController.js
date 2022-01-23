import pool from "../../../db"
import { addPost,deletePost,likePost,unlikePost,commentOnPost,getPostLikeById,getPostCommentById,getAllPost} from "../../queries"
import Joi from "joi";
import res from "express/lib/response";
import req from "express/lib/request";


const postController = {
    
    async addPost(req,res,next){
        const postSchema = Joi.object({
            title: Joi.string(),
            description: Joi.string(),
         })
   
        const {error} =  postSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const {title,description} = req.body
        try {
              await pool.query(addPost,[title,description,req.user.id],(err,results)=>{
                    if (err) {
                        return next(CustomErrorHandler.wrongCredential());
                    }
                    //console.log(results.rows[0]);
                    const post = results.rows[0];
                    return res.json(post)
                }) 
        } catch (err) {
            return next(err)
        }
    },
    async deletePost(req,res,next){
        //console.log(req.user.id)
        if (!req.user.id) {
            return next(CustomErrorHandler.unAuthorized());
        }
        try {
            await pool.query(deletePost,[req.params.id],(err,results)=>{
                  if (err) {
                      return next(CustomErrorHandler.unAuthorized());
                  }
                  if (results) {
                      //console.log(results)
                    return res.json({"status":1})
                  }
                 
              }) 
      } catch (err) {
          return next(err)
      }
    },
    async likePost(req,res,next){
        if (!req.user.id) {
            return next(CustomErrorHandler.unAuthorized());
        }
        try {
            await pool.query(likePost,[req.params.id,req.user.id],(err,results)=>{
                  if (err) {
                      return next(CustomErrorHandler.unAuthorized());
                  }
                  if (results) {
                      //console.log(results)
                    return res.json({"status":1})
                  }
                 
              }) 
      } catch (err) {
          return next(err)
      }
    },
    async unlikePost(req,res,next){
        if (!req.user.id) {
            return next(CustomErrorHandler.unAuthorized());
        }
        try {
            await pool.query(unlikePost,[req.params.id,req.user.id],(err,results)=>{
                  if (err) {
                      return next(CustomErrorHandler.unAuthorized());
                  }
                  if (results) {
                      //console.log(results)
                    return res.json({"status":1})
                  }
                 
              }) 
      } catch (err) {
          return next(err)
      }
    },
    async commentOnPost(req,res,next){
        if (!req.user.id) {
            return next(CustomErrorHandler.unAuthorized());
        }
        try {
            const {comment} = req.body
            await pool.query(commentOnPost,[req.params.id,req.user.id,comment],(err,results)=>{
                  if (err) {
                      return next(CustomErrorHandler.unAuthorized());
                  }
                  if (results) {
                      //console.log(results)
                    return res.json(results.rows[0])
                  }
                 
              }) 
      } catch (err) {
          return next(err)
      }
    },
    async getPostById(req,res,next){
        try {     
            const resultslike = await pool.query(getPostLikeById,[req.params.id])
            const resultsComment =  await pool.query(getPostCommentById,[req.params.id])          
            let data = {
                likes:resultslike.rows.length,
                comments:resultsComment.rows.length
            }
            res.json(data)
      } catch (err) {
          return next(err)
      }
    },
    async getAllPost(req,res,next){
        try {  
            let data = [];
            
            const allPosts = await pool.query(getAllPost)
            for (let i = 0; i < allPosts.rows.length; i++) {
                let cmt = []
               
                const resultLike = await pool.query(getPostLikeById,[allPosts.rows[i].id])
                
                const resultsComment =  await pool.query(getPostCommentById,[allPosts.rows[i].id])              
                cmt.push(resultsComment.rows)

                let dt = {
                    id:allPosts.rows[i].id,
                    title:allPosts.rows[i].title,
                    desc:allPosts.rows[i].description,
                    created_at:allPosts.rows[i].created_at,
                    comments:cmt,
                    like:resultLike.rows.length

                }
                data.push(dt)

            }
            res.json(data)
      } catch (err) {
          return next(err)
      }
    }

}

export default postController