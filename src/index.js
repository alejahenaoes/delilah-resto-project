//importar express
import express from 'express';
const app= express()

//Variables de entorno
import dotenv from 'dotenv'
dotenv.config()

const port= process.env.PORT

//Inicializar DB
import connection from './model/initializeDB.js'

//importar rutas
import authRoute from './routes/authRoutes.js'
import platesRoute from './routes/platesRoutes.js'
import userRoute from './routes/userRoutes.js'
import orderRoute from './routes/ordersRoutes.js'

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use('/api/auth',authRoute)
app.use('/api/plates',platesRoute)
app.use('/api/user',userRoute)
app.use('/api/order',orderRoute)

app.listen(port,()=> console.log(`Listening in the port ${port}`))
