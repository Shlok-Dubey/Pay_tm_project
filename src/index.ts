import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import { connection } from './db';
import intialise from './config/passportConfig';
import sign from './routes/autenticaton';

dotenv.config()
intialise()
const app = express();
app.use(cors({
    origin : '*'
}));
app.use(express.json());
app.use(cookieParser());
connection(process.env.DATABASEURL!)
declare global{
    namespace Express{
        interface User {
            googleId : Number,
            firstName? : String,
            lastName? : String
        }
    }
}
app.use("/app/vi/sign", sign)

app.listen(3000,()=>{
    console.log('Backend has Started')
})