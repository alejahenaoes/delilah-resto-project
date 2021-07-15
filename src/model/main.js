import {role, user,plate, state, order, orderplate } from './initializeDB.js'

export const defaultValues = async () => {


    const validateInitialInsertion = await role.findOne({
        where:{
            name: 'User'
        }
    })

    if(validateInitialInsertion){
        console.log('success')
        return
    }

    const defaultRoles =[ ['Admin'],[ 'User']]

    const defaultUser = [
        ['jn-lennon', 'John Lennon', 'jnlen@mail.com', '345656', 'Avenue 15', 'x1245trE2'],
        ['paul-mc', 'Paul McCartney', 'paulmc@gmail.com', '345654', '7 Cavendish Avenue', 'x1245trE3', 1]
    ]

    const defaultFoodPlates = [
        ['Hamburguesa Veggie', 25, 'Hamburguesa de berenjena con verduras salteadas y mayonesa de zanahoria', 'https://unsplash.com?hamburguesa-veggie'],
        ['Arroz chino', 20, ' Bowl de arroz chino con pollo, carne, cerdo, verduras, maiz, y raices chinas', 'https://unsplash.com?arrozchino'],
        ['Hamburguesa de la casa', 10, 'Hamburguesa triple carne con doble queso y verduras acompañada de cascos fritos', 'https://unsplash.com?hamburguesa'],
        ['Huevo revuelto', 8, 'Delicioso huevo semicocido con especias', 'unsplash.com/500x500/?huevo'],
        ['Croquetas de pollo', 30, 'Igual a los nuggets de McDonalds', 'https://unsplash.com?croquetas']
        ['Ceviche', 45, 'Con las salsas y toppings de tu preferencia', 'https://unsplash.com?ceviche'],
    ]

    const defaultState= [
        ['Pending'],['Sent'],['Cancelled'],['Received']
    ]

    const defaultOrders= [
        [115, 'Paypal', 1],
        [560, 'Paypal', 2]
    ]

    const defaultOrderPlates = [
        [1, 1, 3], [1 ,2, 4],
        [2, 3, 1], [2, 5, 12]
    ]

    // Valores iniciales
    defaultRoles.forEach(element => {
        role.create({ name: element[0] })
    })

    defaultUser.forEach(element => {
        user.create({
            nickname: element[0], name: element[1], email: element[2],
            phonenumber: element[3], adress: element[4], password: element[5], roleId: element[6]
        })
    })

    defaultFoodPlates.forEach(element => {
        plate.create({
            name: element[0], price: element[1], description: element[2], img: element[3]
        })
    })

    defaultState.forEach(element=>{
        state.create({name:element[0]})
    })

    defaultOrders.forEach(element =>{
        order.create({
            total: element[0], payMethod: element[1], userId: element[2]
        })
    })

    defaultOrderPlates.forEach(element =>{
        orderplate.create({
            orderId: element[0], plateId: element[1], quantity: element[2]
        })
    })
}