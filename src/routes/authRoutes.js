
import {Router} from 'express'
const router = Router()

//Validaciones
import {userDataValidation} from '../middlewares/dataValidation.js'
import {userExistenceValidation} from '../middlewares/existingUserValid.js'

//Controlador
import * as authController from '../controllers/authController.js'


//Registro
router.post('/register',userExistenceValidation, userDataValidation, authController.registerUser)

//Login
router.post('/login', authController.userLogin)


export default router