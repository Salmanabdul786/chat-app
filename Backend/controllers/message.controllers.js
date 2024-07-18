import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";


export const sendMessage=async(req,res)=>{
   try{
    const{message}=req.body;
    const {id:receiverId}=req.params;
    const senderId=req.user._id;
    let conversation =await Conversation.findOne({
        participants:{$all:[senderId,receiverId]}
    })
    if(!conversation){
        conversation =await Conversation.create({
            participants:[senderId,receiverId],
        })
    }
    const newMesage=new Message({
        senderId,receiverId,message,
    })
    if(newMesage){ conversation.messages.push(newMesage._id);}
    await Promise.all([conversation.save(),  newMesage.save()]);
  
    res.status(201).json(newMesage);
   }catch(error){
    console.log("Error in sendMessage",error.message);
    res.status(500).json({error:"Internal server error"})
   }
}

export const getMessages=async(req,res)=>{
    try{
        const{id:UsertoChatId}=req.params;
        const senderId=req.user._id;
        const conversation =await Conversation.findOne({
            participants:{$all:[senderId,UsertoChatId]}
        }).populate("messages");
        if(!conversation) return res.status(200).json([]);

        const messages=conversation.messages

        res.status(200).json(messages);

    }catch(error){
        console.log("Error in getMessage",error.message);
        res.status(500).json({error:"Internal server error"})
   }
 }
