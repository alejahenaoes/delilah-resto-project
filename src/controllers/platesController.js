import {plate} from '../model/initializeDB.js'

export const getPlates = async (req, res) =>{

    try {
        const plates = await plate.findAll()

        if (!plates)
            return res.status(404).send('No plate found to order')

        res.status(200).send({ data: plates })
    }
    catch (err) {
        res.status(500).json({message:'Something went wrong'})
    }

}

export const getPlateById = async (req, res) => {

    const id = req.params.id

    try {
        const plates = await plate.findOne({
            where:{
                id: id
            }
        })

        if (!plates)
            return res.status(404).json({message: `No plate found with the id ${id}` })

        res.status(200).json({ message: plates })
    }
    catch (err) {
        console.log('error getting plate', err)
        res.status(500).json({message:'Something went wrong getting the plates'})
    }

}

export const createPlate = async (req, res)  =>{

    const {name,price,description,img} = req.body

    try{
        const plates = await plate.create({name,price,description,img})
        res.status(201).json({message:`Plate ${plates.name} correctly created`})
    }
    catch(err){
        console.log('error creating plate', err)
        res.status(500).json({message:`Plate couldnt be created`})
    }
}

export const updatePlate = async (req, res) => {

    const plateId = req.params.id
    const {name,price,description,img} = req.body

    try{
        const plates = await plate.update({
            name,price,description,img},{
            where:{
                id: plateId
            }
        })

        if(!plates)
            return res.status(404).send(`No plate found with the id ${plateId}`)

        res.status(200).json({message:`Plate ${plateId} correctly updated`})
    }
    catch(err){
        console.log('error updating plate', err)
        res.status(500).json({message:`Plate ${plateId} couldnt be updated`})
    }
}

export const deletePlateById = async (req, res) => {

    const id = req.params.id

    try{
        const plates = await plate.destroy({
            where:{
                id: id
            }
        })

        if(!plates)
            return res.status(404).send(`No plate found with the id ${id}`)

        res.status(200).json({message:`Plate ${id} correctly deleted`})
    }
    catch(err){
        console.log('error deleting plate', err)
        res.status(500).json({message:`Plate ${id} couldnt be deleted `})

    }
}