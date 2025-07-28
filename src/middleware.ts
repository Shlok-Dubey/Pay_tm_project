import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
export function createToken(Id:Number):String{
    const ID = Id.toString()
    const token = jwt.sign(ID, process.env.JWT_SECRET!)
    return token
}
export function verifyToken(req : Request , res : Response , next : NextFunction){
    try{
        const cookie = req.cookies.token ;
        const token = jwt.verify(cookie , process.env.JWT_SECRET! )
        res.locals.userId = token;
        next()
    }catch{
        console.error()
        res.status(303).json({
            error : Error   
        })
    }
    
}