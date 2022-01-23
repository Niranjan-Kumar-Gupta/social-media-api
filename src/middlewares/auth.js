import CustomErrorHandler from "../services/CustomErrorHandler";
import JwtService from "../services/JwtService";

const auth = async (req,res,next)=>{
    let authHeader = req.headers.authorization;
  
    if (!authHeader) {
        return next(CustomErrorHandler.unAuthorized());
    }
    const token = authHeader.split(' ')[1];
    
   
    try {
        
        const {id,name,email} = await JwtService.verify(token)
        if (!id) {
            return next(CustomErrorHandler.unAuthorized());
        }
       
        const user = {
            id,
            name,
            email
        }
        req.user = user;
       
        next();
        
    } catch (err) {
        return next(CustomErrorHandler.unAuthorized());
    }
}
export default auth;



 