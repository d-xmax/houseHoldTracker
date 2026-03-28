import mongoose from "mongoose";
 
const connectDB = async()=>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
         
            // Connected to DB
            // Database namespace
        

    } catch (error) {
        // Error log removed
        process.exit(1)
    }
}

export {connectDB}    