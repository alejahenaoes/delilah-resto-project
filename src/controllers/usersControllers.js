import {user} from '../model/initializeDB.js'

export const getUsers= async (req,res)=>{

    try{
        const getusers= await user.findAll()
        res.status(200).send({message:getusers})
    }
    catch(err){
        console.log('Error getting users', err)
        res.status(400).json({message:'Problem getting users information'})
    }
}

export const getUserById= async (req,res)=>{

    const id = req.params.id

    try{
        const getusers= await user.findOne({
            where:{
                id
            }
        })
        res.status(200).send({message:getusers})
    }
    catch(err){
        console.log('Error getting user', err)
        res.status(400).json({message:'Problem getting user information'})
    }
}

export const createUser = async (req, res)  =>{

    const {nickname,name,email,phonenumber,adress,password} = req.body

    try{
        const newuser= await user.create({nickname,name,email,phonenumber,adress,password, roleId: 1})
        res.status(201).json({message:`User ${newuser.nickname} with admin permission correctly created`}) 
    }
    catch(err){
        console.log('error creating plate', err)
        res.status(400).json({message:`User couldnt be created`})
    }
}


export const deleteUserById = async (req, res) => {

    const id = req.params.id

    try{
        const deleteUser = await user.destroy({
            where:{
                id: id
            }
        })

        if(!deleteUser)
            return res.status(404).json({message: 'User wasn´t found'})

        res.status(200).json({message: `User ${id} correctly deleted`})
    }
    catch(err){
        console.log('Error deleting user', err)
        res.status(400).json({message:'Error deleting user account'})
    }
}