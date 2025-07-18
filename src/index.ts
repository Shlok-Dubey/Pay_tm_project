import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { connection } from './db';
import intialise from './config/passportConfig';

dotenv.config()
intialise()
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
connection(process.env.DATABASEURL!)

app.listen(3000,()=>{
    console.log('Backend has Started')
})