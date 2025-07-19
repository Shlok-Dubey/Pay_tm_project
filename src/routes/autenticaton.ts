import express, { Request, Response } from 'express'
import passport from 'passport';
import { userModel } from '../db';


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
        const existingUser = userModel.find({
            googleId : user.googleId
        })

    });

export default sign