import mongoose from "mongoose";


mongoose.set('strictQuery', false);

const connectToMongoDB = async () =>{

try {
    

    await mongoose.connect(process.env.dbUrl);
   console.log("connected to the database");
} catch (error) {
    
    console.log("eroor in connection" , error.message);
}



}

export default connectToMongoDB;