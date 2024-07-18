import mongoose from "mongoose";


const connectTodb =async()=>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URL,);
        console.log("Connected");
    }catch(error){
            console.log("umable to connect", error.message);
    }
}

export default connectTodb;