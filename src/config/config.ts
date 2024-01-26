import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config();

const  dbConnect = async ()=> {
    try {
      const mongoUri = await mongoose.connect(process.env.MONGO_URI!); 
      console.log("mongodb connected");
      
    } catch (err) {
        console.log(`err -${err}`)
        process.exit(1);
    }
}
export default dbConnect;