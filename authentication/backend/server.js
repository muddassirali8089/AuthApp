

import  express  from "express";
import  dotenv  from "dotenv";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/conectToMongoDB.js";
import cors from "cors";

import authRoute from "./Routes/Auth.routes.js"
import protectedRoute from "./middleware/protectedRoute.js";



const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Adjust the origin to match your frontend
    credentials: true // Allow credentials (cookies)
  }));
app.use(express.json()); 
bodyParser.urlencoded({extended : true});

app.use(cookieParser());

const  port = process.env.PORT || 5000; 
dotenv.config();
app.listen(port , function(){

    console.log(`server is lisning... ${port}`);
})

connectToMongoDB();
app.get("/", (req , res) =>{
    res.cookie("name", "programng").send("hii")
})

app.use("/api/auth" , authRoute);


app.post('/api/protectedRoute/:id',  protectedRoute ,  (req , res) =>{
     const {id} = req.params; 
     console.log(id);
     res.status(200).send({mes : "Authorized user..."})
    

})



