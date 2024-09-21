

import jwt  from "jsonwebtoken"

const generateTokenAndSetCookie  = (userId , res) => {


     const Token  = jwt.sign({userId} , process.env.jwtSecret , {
        expiresIn: '30d',
        
    })

        res.cookie( "jwt" , Token, {
            maxAge: 15*24*60*60*1000,
            httpOnly : true,
            samesite : "None",
            secure:"true"
        } ) ;


        // res.status(200).cookie("token", Token, { http: true }).json({ payload });

 }
 export default generateTokenAndSetCookie;



