//dependencias
const express =require('express');
const morgan = require('morgan');
const cors= require('cors');
//
const facturacionRoutes=require('./routes/facturacion.routes')
//guarda la ejecucion de express
const app=express();

app.use(cors());

app.use(morgan('dev'));

app.use(express.json());

app.use(facturacionRoutes)
//funciones 
app.use((err,req,res, next)=>{
    //next error comun
    return res.json({
        message:err.message
    })
})
//escucha por el puerto 400
app.listen(4000)
//mensaje cuando se ejecute correctamente el servidor 
console.log('server on port 4000')