const express= require('express')
const myconn = require ( 'express-myconnection')
const mysql = require ('mysql')

const routes = require('./routes')

const app= express()
//server running------------------------------

const PORT= process.env.PORT || 9000;
app.listen(PORT, ()=>{
    console.log(`Servidor andando en : ${PORT}`)
})

const dbOption= {
    host: 'localhost', 
    port: 3306,
    user: 'root', 
    password: '',
    database: 'library'


}
// middlewares para conexion con base de datos

app.use(myconn(mysql, dbOption, 'single'))
app.use(express.json())


//routes-------------------------------
app.get('/', (req, res) => {
    res.send('Welcome to my app')
})

app.use('/api', routes)