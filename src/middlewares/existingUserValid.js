import {user} from '../model/initializeDB.js'


export const userExistenceValidation = async (req,res,next) => {

    const {nickname,email} = req.body

    try {
        const validateEmailExistence = await user.findOne({
            where:{ email: email}
        })

        if(validateEmailExistence)
            return res.status(400).json({message:' Email already exists'})

        const validateNickanmeExistence = await user.findOne({
            where:{nickname: nickname}
        })

        if( validateNickanmeExistence)
            return res.status(400).json({message:'Nickname already exists'})

        next()


    } catch (error) {
        console.log('error', error)
        return res.status(400).json({message:'Error validating the existence of the user'})
    }

}