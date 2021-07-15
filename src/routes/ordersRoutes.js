import {Router} from 'express'
const router = Router()

/* VALIDATION */
import {verifyToken} from '../middlewares/tokenValidation.js'
import {adminrole} from '../middlewares/adminValidation.js'

//Controlador
import * as orderController from '../controllers/orderController.js'


router.use(verifyToken)


//Get todas las ordenes disponibles
router.get('/',adminrole , orderController.getOrders )

//Get orden por id
router.get('/:id', adminrole , orderController.getOrderById )

//Crear/Post nueva orden
router.post('/',  orderController.createOrder)

//Actualizar orden
router.put('/:id',adminrole,orderController.updateOrder)

//Eliminar orden por id
router.delete('/:id',adminrole, orderController.deleteOrderById)


export default router