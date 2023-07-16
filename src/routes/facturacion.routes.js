//endpoints
const { Router } = require('express');
//traer las funciones 
const { getUsuario,getUsuario1 , deleteUsuario, updateUsuario, getAllDeportistas, createUsuarioDep, createUsuarioEntre, getAllEntrenadores, getAllPromociones,createDeportista, createEntrenador, updateUsuarioEntrenador, createPromocion, getAllProductos, createProducto, deleteProducto, getAllPedidos, createCliente } = require('../Controllers/facturacion.controller')
//traer la conexion a bd
const pool = require('../db');
//crear nuevas url
const router = Router();
//obtener todo los deportistas
//metodos que muestran que se quiere hacer en el backend 
router.get('/usuario', getAllDeportistas)
//obtener todos los Entrenadores
router.get('/usuario/entrenador',getAllEntrenadores)
//obtener todos los Productos 
router.get('/usuario/producto',getAllProductos)
//obtener todas las Promociones 
router.get('/usuario/promociones',getAllPromociones)
//obtener todos los pedidos
router.get('/usuario/pedidos',getAllPedidos)
//obtener uno
router.get('/usuario/:usuario', getUsuario)
//obotener uno con dos parametros(login)
router.get('/usuario/:usuario/:contrasena', getUsuario1)
//crear un usuario con rol Deportista
router.post('/usuario', createUsuarioDep)
//crear un usuario con rol Entrenador 
router.post('/usuario/uentrenador',createUsuarioEntre)
//crear un desportista
router.post('/usuario/deportista',createDeportista)
//crear un entrenador
router.post('/usuario/entrenador',createEntrenador)
//crear una promocion
router.post('/usuario/promocion',createPromocion)
//crear una cliente
router.post('/usuario/cliente',createCliente)
//crear un producto
router.post('/usuario/producto',createProducto)
//eliminar actividad
router.delete('/usuario/:usuario', deleteUsuario)
//actualizar usuario deportista
router.put('/usuario/:usuario1', updateUsuario)
//actualizar usuario entrenador
router.put('/uentrenador/:usuario1', updateUsuarioEntrenador)
//eliminar Producto
router.delete('/producto/:usuario', deleteProducto)
//exportar
module.exports = router;