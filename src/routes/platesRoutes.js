import {Router} from 'express'
const router = Router()

//Validaciones
import {verifyToken} from '../middlewares/tokenValidation.js'
import {adminrole} from '../middlewares/adminValidation.js'

//Controladores
import * as plateController from '../controllers/platesController.js'


router.use(verifyToken)


//Get todos los platos
router.get('/', plateController.getPlates )

//Get plato por id
router.get('/:id', plateController.getPlateById )

//Crear/Post nuevo plato
router.post('/',adminrole,plateController.createPlate)

//Actualizar plato
router.put('/:id',adminrole,plateController.updatePlate)

//Eliminar plato
router.delete('/:id',adminrole, plateController.deletePlateById)


export default router