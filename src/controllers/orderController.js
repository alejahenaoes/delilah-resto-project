import connection from '../database.js'
import {Sequelize} from 'sequelize'
const {QueryTypes} = Sequelize

import { user,order, orderplate, plate, state } from '../model/initializeDB.js'


export const getOrders = async (req, res) => {

    try{
        const orderList = await order.findAll()

        if(!orderList)
            return res.status(404).json({ message: `There aren´t any orders yet...` })

        const messageSend = await getOrdersFunc(orderList)


        res.status(200).json({message : messageSend})

    }
    catch(err){
        res.status(500).json({message:' Couldnt get any order'})
    }

}


export const getOrderById = async (req, res) => {

    const orderId = req.params.id 

    try{

    const orderListById = await order.findOne({
        where:{
            id: orderId
        }
    })

    console.log(orderListById)

    if(!orderListById)
        return res.status(404).json({ message: `Order ${orderId} not found` })


    const messageSend = await  getOrdersFunc([orderListById])

    res.status(200).json({message : messageSend})

    }
    catch(err){
        res.status(200).json({message:' Couldnt get any order'})
    }

}


const getOrdersFunc = async (orderList) => {

    let messageSend = []
    console.log('joined here')

    for await (const element of orderList) {

        let fullOrderList = {}

        fullOrderList.orderId = element.dataValues.id

        const clientId= element.dataValues.userId
        const clientSearch = await user.findAll({
            where:{
                id:clientId
            }
        })
        const clientData= clientSearch[0].dataValues
        console.log(clientData)

        fullOrderList.username = clientData.name
        fullOrderList.phonenumber = clientData.phonenumber
        fullOrderList.adress = clientData.adress

        fullOrderList.total = element.dataValues.total
        fullOrderList.payMethod = element.dataValues.payMethod

        let orderplateSearch = await orderplate.findAll({
            where:{
                orderId: element.dataValues.id
            }
        })

        if(orderplateSearch){
            let plates =[]
            orderplateSearch.forEach( async (element) => {
                let plate = {}
                plate.plateId = element.dataValues.plateId
                plate.quantity = element.dataValues.quantity
                plates.push(plate)
            })
            fullOrderList.plates= plates
        }

        const orderState = await state.findOne({
            where:{
                id: element.dataValues.stateId
            }
        })


        fullOrderList.state = orderState.name
        messageSend.push(fullOrderList)
    }

    return messageSend
}

export const createOrder = async (req, res) => {

    const { payMethod, plates } = req.body
    const userData = req.userData
    let total = 0

    try {
        for await (const element of plates) {

            const foundPlate = await plate.findOne({
                where: {
                    id: element.id
                }
            })

            if (!foundPlate)
                return res.status(404).json({ message: `Plate ${element.id} not found` })

            const platePrice = foundPlate.dataValues.price
            const finalPriceByPlate = platePrice * element.quantity

            console.log(platePrice, '* ', element.quantity, ' =', finalPriceByPlate)

            total += finalPriceByPlate
        }

        await order.create({
            total, payMethod, userId: userData.id
        })

        const [lastIdQuery] = await connection.query('SELECT max(id) FROM orders ',{type: QueryTypes.SELECT})
        const lastId = Object.values(lastIdQuery)[0]

        for await (const element of plates) {

            await orderplate.create({
                orderId:  lastId,
                plateId: element.id,
                quantity: element.quantity
            })

        }


        console.log('the new total is ', total)
        res.status(200).json({ message: `Total is ${total} and the order was created, thanks ${userData.nickname} for your buy` })
    }
    catch (err) {
        console.log('error in your order ', err)
        res.status(400).json({ message: `Something failed in your order ${err}` })
    }

}

export const updateOrder = async (req, res) => {

    const orderId = req.params.id 
    const {stateId} = req.body

    try{

        await order.update({stateId},{
            where:{
                id: orderId
            }
        })

        res.status(200).json({ message: `Order ${orderId} has been updated ` })

    }
    catch(err){
        console.log('error update order ', err)
        res.status(400).json({ message: `Something failed updating order ${err}` })
    }

}

export const deleteOrderById = async (req, res) => {

    const orderId = req.params.id 

    try{

        const orderSearch = await order.findOne({ where: { id: orderId}})

        if(!orderSearch)
            return res.status(404).json({ message: `Order ${orderId} does not exist` })


        await orderplate.destroy({  where:{orderId} })

        await order.destroy({
            where:{
                id: orderId
            }
        })

        res.status(200).json({ message: `Order ${orderId} has been deleted ` })

    }
    catch(err){
        console.log('error update order ', err)
        res.status(400).json({ message: `Something failed deleting order ${err}` })
    }

}