// import mongoose from "mongoose";
// export const connectDB=async(req,res)=>{
//    try{
//       await mongoose.connect(process.env.MONGO_URL);
//     //   await mongoose.connect("mongodb://codeblessed:codeblessed123@cluster0.wenlspk.mongodb.net/?appName=Cluster0");
//       console.log("Database connected")
//    }catch(error){
// console.log(`error in connecting database ${error}`)
//    }
// }


import mongoose from "mongoose";
import dns from "dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

export const connectDB = async () => {
  try {
    console.log("URL:", process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL);

    console.log("Database connected");
  } catch (error) {
    console.log("FULL ERROR:");
    console.dir(error, { depth: null });
  }
};