import jwt from 'jsonwebtoken';
import User from '../models/user';

export default async function AuthedUser (req, res, next) {
   
    try{
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token,process.env.SECRET_KEY);
      // var user = await User.findOne({payload.email);
     // req.user = user;
    }catch(error){
        
    }
    next();
}