import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenandSetcokkie from "../utils/generateToken.js";


export const signup=async(req,res)=>{
    try{
        const {fullName,username,password,confirmPassword,gender}=req.body;
         if(password!==confirmPassword){
            return res.status(400).json({error:"Password not mtch"})
         }
         const user=await User.findOne({username})
            if(user){
                return res.status(400).json({error:"User already exist"})
         }

        const salt= await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const boyPropic=`https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlPropic=`https://avatar.iran.liara.run/public/girl?username=${username}`

        const newUser =new User({
            fullName,username,password:hashedPassword,gender,profilePic:gender==="male"? boyPropic:girlPropic
        })
      if(newUser){
     generateTokenandSetcokkie(newUser._id,res);
        await newUser.save();
        res.status(201).json({
            _id:newUser._id,
            fullName:newUser.fullName,
            username:newUser.username,
            profilePic:newUser.profilePic
        })
      }else{
        return res.status(400).json({error:"Invald user data"})
      }
 }catch(error){
            console.log("Error in Signup",error.message);
res.status(500).json({error:"Internal Server error"})
  }
}



export const login=async(req,res)=>{
try{
  const {username,password}=req.body;
  const user=await User.findOne({username});
  const correctPassword=await bcrypt.compare(password, user?.password || "");
  if(!user || !correctPassword){
  return res.status(400).json({error:"Invalid Cred"})
}
generateTokenandSetcokkie(user._id,res);
res.status(200).json({
  _id:user._id,
  fullName:user.fullName,
  username:user.username,
  profilePic:user.profilePic,
});
}catch(error){
  console.log("Error in Login",error.message);
   res.status(500).json({error:"Internal Server error"});
}
}
export const logout=(req,res)=>{
try{
    res.cookie("jwt","",{maxAge:0});
    res.status(200).json({message:"Logged out success"})
}catch(error){
  console.log("Error in Signup",error.message);
  res.status(500).json({error:"Internal Server error"})
}
}
