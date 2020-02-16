import  * as jwt from 'jsonwebtoken';
import User from '../models/user';
import {secretKey} from '../env';
export default async function AuthedUser (req, res, next) {
    try{
      const token = req.headers.authorization.split(" ")[1];
      const payload = jwt.verify(token,secretKey);
      // var user = await User.findOne({payload.email);
      req.user = payload;
    }catch(error){
     
    }
    next();
}