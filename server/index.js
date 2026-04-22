import express from "express"
import dotenv from  "dotenv"
import connectDb from "./config/connectDb.js";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./routes/auth.route.js";
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js";
dotenv.config()
const app=express();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())
app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview",interviewRouter)
app.get("/",(req,res)=>{
    return res.json("message:server started")
})
const PORT=4000
// const PORT=process.env.PORT
// const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
    connectDb()
})