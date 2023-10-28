import Jwt  from "jsonwebtoken";
import 'dotenv/config';

export default (req, res, next) => {
   const token = req.cookies.accessToken;
   if (!token) {
     return res.json("The token was not available");
   }else
   {
     Jwt.verify(token, process.env.TOKEN_KEY, (err, decode) => {
       if (err) {
         return res.json("Token is wrong");
         next();
       }
     });
   }
 };