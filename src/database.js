//Conectar con DB
import {Sequelize} from 'sequelize'

//Variables de entorno
import dotenv from 'dotenv'
dotenv.config()

//Establecer conexión
const connection = new Sequelize(`mysql://${process.env.DB_CONNECTION_USER}:${process.env.DB_CONNECTION_PASSWORD}@${process.env.DB_CONNECTION_PORT}/${process.env.DB_CONNECTION_DATABASENAME}`)


export default connection
