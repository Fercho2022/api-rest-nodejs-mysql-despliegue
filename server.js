const express= require('express')
const myconn = require ( 'express-myconnection')
const mysql = require ('mysql')
const cors = require('cors')
require ('dotenv').config()

const routes = require('./routes')

const app= express()
//server running------------------------------

const PORT= process.env.PORT || 9000;
app.listen(PORT, ()=>{
    console.log(`Servidor andando en : ${PORT}`)
})

const dbOption= {
    host: process.env.DB_HOST || 'localhost', 
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USER || 'root', 
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'library'


}
// middlewares para conexion con base de datos

app.use(myconn(mysql, dbOption, 'single'))
app.use(express.json())
app.use(cors())


//routes-------------------------------
app.get('/', (req, res) => {
    res.send('Welcome to my app')
})

app.use('/api', routes)

app.use((req, res, next)=>{
    res.status(404).json({
        message: 'ebdpoint not found'
    })
})