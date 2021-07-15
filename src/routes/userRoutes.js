import {Router} from 'express'
const router = Router()

//Controladores
import * as userController from '../controllers/usersControllers.js'

//Validaciones
import {verifyToken} from '../middlewares/tokenValidation.js'
import {adminrole} from '../middlewares/adminValidation.js'
import {userDataValidation} from '../middlewares/dataValidation.js'
import {userExistenceValidation} from '../middlewares/existingUserValid.js'


router.use(verifyToken)

// Get todos los usuarios
router.get('/',adminrole, userController.getUsers )

// Get todos los usuarios
router.get('/:id',adminrole, userController.getUserById )

//Post/Crear nuevo usuario
router.post('/',adminrole,userExistenceValidation, userDataValidation, userController.createUser )

//Eliminar usuario por id
router.delete('/:id',adminrole, userController.deleteUserById )

export default router