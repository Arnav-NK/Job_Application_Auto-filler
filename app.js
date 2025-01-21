import express from 'express';
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import dbConnect from './database/dbConnect.js';
dotenv.config({path :'./config/config.env'})
const app=express();
app.use(cors({
    origin:[process.env.PORTFOLIO_URL,process.env.DASHBOARD_URL],
    methods:['GET','POST','PUT','DELETE'],
    credentials:true

}))
app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))
dbConnect();
 export default  app;