// export default function authed(req, res, next) {
//     if(!req.user){
//         const err = new Error("Not authorized! Go back!");
//         err.status = 400;
//         next(err); // This will be caught by error handler
//     }else{
//         next();
//     }
//   };