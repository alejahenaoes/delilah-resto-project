import jwt from 'jsonwebtoken'
import {user} from '../model/initializeDB.js'

import dotenv from 'dotenv'
dotenv.config()

export const verifyToken = async (req,res,next) =>{

    try{
        const token = req.header('auth-token')

        if(!token)
            return res.status(401).json({message: " Not token provided"})

        const decoded = jwt.verify(token, process.env.TOKEN_SECRET )

        const finduser = await user.findOne({
            where:{
            id: decoded.id}
        })

        if(!finduser)
            return res.status(401).json({message: " Not authorized"})

        let userData = finduser.dataValues
        req.userData= userData

        next()
    }
    catch(err){
        console.log('Something happened verifying token ', err)
        return res.status(500).json({message: "Error in token validation"})

    }

}