import express from "express";
import dotenv from "dotenv";
import path from 'path';
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoute from "./routes/user.routes.js";
import connectTodb from "./db/connect.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
// app.get("/",(req, res)=>{
//     res.send("Hello World");
// })

const __dirname=path.resolve();

app.use(express.json()); // parse from req.body
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoute);



app.use(express.static(path.join(__dirname,"/Frontend/dist")));
app.get("*",(req,res)=>{
res.sendFile(path.join(__dirname,"Frontend","dist","index.html"));
});

server.listen(PORT, () => {
  connectTodb();
  console.log(`Running on port ${PORT}`);
});

//abdulkareem786salman
//lZnhznqapsDBEgCO
