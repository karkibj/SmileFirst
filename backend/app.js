import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import messageRouter from './routes/getmessage.route.js';
import cors from "cors";


dotenv.config({
    path:'./.env'
})

const app=express();
app.use(cors({
    origin:" http://localhost:3000",
    methods:['POST']
}))

const PORT=4000

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(messageRouter)


app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})
