import * as createError  from 'http-errors';
export default function authed(req, res, next) {
    if(!req.user){
        return next(createError(401,"Not authorized!"));
    }else{
        return next();
    }
};