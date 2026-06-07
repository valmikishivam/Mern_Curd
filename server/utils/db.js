import mongoose from "mongoose";

const dbConnect =async(req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('DATABASE CONNECTED');
    } catch (error) {
        console.log(error.message);
        res.status(500).json({satus:false,msg:'database error'})
    }
}
export default dbConnect