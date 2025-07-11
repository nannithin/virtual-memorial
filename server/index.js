import express from "express";
import cors from 'cors';
import allRoutes from './routes/index.js'
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
dotenv.config();


const port = process.env.PORT || 5000
const app = express();
app.use(cors({
  origin: process.env.CLIENT,
  credentials: true
}));

console.log(process.env.CLIENT)
console.log(process.env.PORT)
console.log(process.env.MONGO_URI)

app.use(express.json());
app.use(cookieParser());
app.use('/api',allRoutes)

const mongoCon = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected')
    } catch (error) {
        console.log(error.message);
    }
}



app.listen(port, () => {
    console.log("server runnig on port 5000");
    mongoCon();
})