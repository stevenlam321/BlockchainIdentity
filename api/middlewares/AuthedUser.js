import jwt from 'jsonwebtoken';
import models from '../models';

export default async function AuthedUser (req, res, next) {
   
    try{
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token,process.env.SECRET_KEY);
      var user = await models.User.findById(payload.user_id);
      req.user = user;
    }catch(error){
        
    }
    next();
}