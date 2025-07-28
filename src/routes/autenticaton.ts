import express, { Request, Response } from 'express'
import passport from 'passport';
import { balanceModel, userModel } from '../db';


const sign = express.Router();

sign.get('/in', passport.authenticate("google",{scope : ['profile']}))

sign.get('/google/auth', 
    passport.authenticate('google', { failureRedirect: '/login', session:false }), async (req : Request , res : Response)=>{
        const user = req.user ; 
        res.json({user})
        console.log(user)
        if(!user){
            res.status(400).json({
                message : "User Not Found"
            })
            return
        }
        const existingUser = await userModel.find({
            googleId : user.googleId
        })
        try{

            if(!existingUser){
                const amount = 1 + Math.random() * 10000 
                const createdUser = await userModel.create({
                    googleId : user.googleId,
                    firstName : user.firstName,
                    lastName : user.lastName
                })
                
                const createdBalance = await balanceModel.create({
                    userId : createdUser.googleId,
                    amount : amount
                })
                res.status(200).json({
                    message : 'User Created Successfully'
                })
                return
            }
        }catch{
            console.error;
            res.status(500).json({
                message : 'Internal Server Failed'
            })
            return
        }
         



    });

export default sign