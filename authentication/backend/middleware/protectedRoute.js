import userModel from "../model/user.model.js";
import Jwt from "jsonwebtoken";

const protectedRoute = async (req, res, next) => {
    try {
        const token = req.cookies?.jwt;

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: no token provided" });
        }

        const decodedToken = Jwt.verify(token, process.env.jwtSecret);
        if (!decodedToken) {
            return res.status(401).json({ error: "Invalid token" });
        }

        const userIdFromToken = decodedToken.userId;

        // Retrieve the user from the database using the userId extracted from the token
        const user = await userModel.findById(userIdFromToken).select("-password");
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the user ID from the token matches the user ID from the route parameters
        if (user._id.toString() !== req.params.id) {
            return res.status(403).json({ error: "Unauthorized: user ID mismatch" });
        }

        // If the user ID matches, set req.user and proceed to the next middleware
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in protected routes function", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default protectedRoute;






// import userModel from "../model/user.model.js";

// import  Jwt  from "jsonwebtoken";


// const protectedRoute = async (req , res , next) =>{


//     try {


//         const token = req.cookies?.jwt;
       
//         if(!token){
//             return res.status(401).json({  error : "un autorized no token provided"});
//         }
//         const decodedToken = Jwt.verify(token , process.env.jwtSecret);
//         if (!decodedToken) {
//             res.status(401).json({ error : "invalid token"});
//         }

//         const user = await userModel.findById(decodedToken.userId).select("-password");

//         if (!user) {
//             res.status(404).json({error : "user not found"}); 
            
//         }

//         req.user=user;
//         next();
//     } catch (error) {

//         console.log("Error in protected routes function", error.message);
//         res.status(500).send({ error: "internal server error"});
        
//     }

// }
// export default protectedRoute;