import  * as jwt from 'jsonwebtoken';
import User from '../models/user';
import {secretKey} from '../env';
import {InitFabricCtrls} from '../convector';
export default async function AuthedUser (req, res, next) {
    var identityID = null;
    try{
      const token = req.headers.authorization.split(" ")[1];
      
      const payload = jwt.verify(token,secretKey);
      // var user = await User.findOne({payload.email);
      req.user = payload;
      identityID = payload.identityID;
    }catch(error){
        
    }  
    req.ctrls = await InitFabricCtrls(identityID);
    next();
}