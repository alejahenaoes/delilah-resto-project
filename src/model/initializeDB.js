import { Sequelize } from 'sequelize'
const { DataTypes } = Sequelize

// Conexión base de datos
import connection from '../database.js'

import {defaultValues} from './main.js'

import { roleModel } from './role.js'
import { userModel } from './user.js'
import { stateModel } from './state.js'
import { orderModel } from './order.js'
import { plateModel } from './plate.js'
import { orderplateModel } from './orderPlate.js'

const role = roleModel(connection, DataTypes)
const user = userModel(connection, DataTypes)
const state = stateModel(connection, DataTypes)
const plate = plateModel(connection, DataTypes)
const order = orderModel(connection, DataTypes)
const orderplate = orderplateModel(connection, DataTypes)

export default connection.sync()
    .then(()=> defaultValues())
    .catch(err=> console.log(err))

export { role, user, state, plate, order, orderplate }