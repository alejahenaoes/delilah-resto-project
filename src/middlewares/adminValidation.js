export const adminrole = async  (req,res,next) => {

    try{
        if(req.userData.roleId !== 1)
            return res.status(401).send({message: 'Admin permission denied'})

        next()
    }
    catch(err){
        console.log('admin error ', err)
        return res.status(401).send({message: 'error due to Admin permission'})
    }
}