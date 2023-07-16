const pool = require('../db')
//funciones 
//buscar todos los deportistas
const getAllDeportistas = async (req, res, next) => {
    try {
        const allUsuarios = await pool.query('select u.id,r.nombre as rol ,u.nombre,u.apellidos,u.cedula,u.usuario,u.contrasena,u.telefono,u.email from usuario as u inner join rol as r on u.rol_id = r.id where r.id=1')
        res.json(allUsuarios.rows)
    } catch (error) {
        //mensaje con la funcion next
        next(error)
    }

};
//buscar todos los entrenadores
const getAllEntrenadores = async (req, res, next) => {
    try {
        const allUsuarios = await pool.query('select u.id,r.nombre as rol ,u.nombre,u.apellidos,u.cedula,u.usuario,u.contrasena,u.telefono,u.email from usuario as u inner join rol as r on u.rol_id = r.id where r.id=2')
        res.json(allUsuarios.rows)
    } catch (error) {
        //mensaje con la funcion next
        next(error)
    }

};
//buscar todas las promociones 
const getAllPromociones = async (req, res, next) => {
    try {
        const allUsuarios = await pool.query('select p.promotion_code as id,p.Promotion_descript as Promocion, p.Date_start as fecha_Inicio, p.Date_end as fecha_Final from Promociones as p')
        res.json(allUsuarios.rows)
    } catch (error) {
        //mensaje con la funcion next
        next(error)
    }

};
//buscar todas las promociones 
const getAllPedidos = async (req, res, next) => {
    try {
        const allUsuarios = await pool.query('select pe.code_order, cl.customer_name, u.nombre,pe.code_product,pe.date_of_order, pro.product_name  from pedido as pe inner join cliente as cl on  pe.code_customer=cl.code_customer inner join usuario as u on pe.code_usuario = u.id inner join producto_Pedido as prpe on pe.code_order=prpe.code_order inner join producto as pro on prpe.code_products = pro.code_products')
        res.json(allUsuarios.rows)
    } catch (error) {
        //mensaje con la funcion next
        next(error)
    }

};
//buscar todas las promociones 
const getAllProductos = async (req, res, next) => {
    try {
        const allUsuarios = await pool.query('select p.Code_products as id,u.nombre as Empleado,pr.promotion_descript as promocion, p.Products_descript as descripcion, p.Produtc_price as precio,p.Product_name as producto, p.stock from producto as p inner join usuario as u on u.id = p.code_usuario  inner join promociones as pr on pr.promotion_code = p.promotion_code where p.code_usuario=u.id')
        res.json(allUsuarios.rows)
    } catch (error) {
        //mensaje con la funcion next
        next(error)
    }

};
//buscar todos los entrenamientos para Entrenador

//buscar todos los entrenamientos para Deportista

//buscar uno 
const getUsuario = async (req, res, next) => {
    try {
        const { usuario } = req.params
        const result = await pool.query('select * from usuario where usuario=$1', [usuario])
        //si no se encuentra el usuario
        if (result.rows.length === 0)
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}
//login
const getUsuario1 = async (req, res, next) => {
    try {
        const { usuario, contrasena } = req.params
        const result = await pool.query('select * from usuario where usuario=$1 and contrasena=$2', [usuario, contrasena])
        //si no se encuentra el usuario
        if (result.rows.length === 0)
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}
//crear usuarios rol Deportista
const createUsuarioDep = async (req, res, next) => {
    const { nombre, apellidos, cedula, usuario, contrasena, telefono, email } = req.body

    try {
        const result = await pool.query(
            'insert into usuario(rol_id,nombre,apellidos,cedula,usuario,contrasena,telefono,email)values(1,$1,$2,$3,$4,$5,$6,$7) RETURNING *', [
            nombre, apellidos, cedula, usuario, contrasena, telefono, email
        ])

        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}

//crear usuarios rol Deportista
const createProducto = async (req, res, next) => {
    const { code_usuario, promotion_code, products_descript, produtc_price, product_name, stock} = req.body

    try {
        const result = await pool.query(
            'insert into producto (code_usuario,promotion_code, products_descript,produtc_price,product_name, stock) values($1,$2,$3,$4,$5,$6) RETURNING *', [
            code_usuario, promotion_code, products_descript, produtc_price, product_name, stock
        ])

        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}
//Crear un usuario rol Entrenador 
const createUsuarioEntre = async (req, res, next) => {
    const { nombre, apellidos, cedula, usuario, contrasena, telefono, email } = req.body

    try {
        const result = await pool.query(
            'insert into usuario(rol_id,nombre,apellidos,cedula,usuario,contrasena,telefono,email)values(2,$1,$2,$3,$4,$5,$6,$7) RETURNING *', [
            nombre, apellidos, cedula, usuario, contrasena, telefono, email
        ])

        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}
//crear un deportista
const createDeportista = async (req, res, next) => {
    const { tipo, id, peso, altura, estado } = req.body

    try {
        const result = await pool.query(
            'insert into deportista(tipo_usuario,usuario_id,peso,altura,estado) values($1,$2,$3,$4,$5) RETURNING *', [
            tipo, id, peso, altura, estado
        ])

        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}
//CREAR UN ENTRENADOR 
const createEntrenador = async (req, res, next) => {
    const { code_customer,code_usuario,date_of_order } = req.body

    try {
        const result = await pool.query(
            'insert into pedido(code_customer,code_usuario,date_of_order ) values($1,$2,$3) RETURNING *', [
            code_customer,code_usuario,date_of_order
        ])

        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}
//CREAR UN ENTRENADOR 
const createProped = async (req, res, next) => {
    const { code_order,code_products } = req.body

    try {
        const result = await pool.query(
            'insert into producto_pedido(code_order, code_products) values($1,$2) RETURNING *', [
                code_order,code_products
        ])

        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}
//CREAR UNA PROMOCION
const createPromocion = async (req, res, next) => {
    const { promocion,fechaInicio,fechaFin } = req.body

    try {
        const result = await pool.query(
            'insert into promociones(Promotion_descript,Date_start,Date_end) values($1,$2,$3) RETURNING *', [
            promocion,fechaInicio,fechaFin
        ])

        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}
//CREAR UN CLIENTE
const createCliente = async (req, res, next) => {
    const { customer_name,customer_phone,customer_adress } = req.body

    try {
        const result = await pool.query(
            'insert into cliente(customer_name,customer_phone,Customer_adress) values($1,$2,$3) RETURNING *', [
            customer_name,customer_phone,customer_adress
        ])

        res.json(result.rows[0]);
    } catch (error) {
        next(error)
    }
}
//eliminar un usuario 
const deleteUsuario = async (req, res, next) => {

    try {
        const { usuario } = req.params
        const result = await pool.query('delete from usuario where usuario=$1', [usuario])
        if (result.rowCount === 0)
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

const deleteProducto = async (req, res, next) => {

    try {
        const { usuario } = req.params
        const result = await pool.query('delete from producto where code_products=$1', [usuario])
        if (result.rowCount === 0)
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}

//ACTUALIZAR UN USUARIO DEPORTISTA
const updateUsuario = async (req, res, next) => {
    const { usuario1 } = req.params
    try {
        const { nombre, apellidos, cedula, usuario, contrasena, telefono, email } = req.body
        const result = await pool.query('update usuario set rol_id=1,nombre=$1,apellidos=$2,cedula=$3,usuario=$4,contrasena=$5,telefono=$6,email=$7 where usuario=$8 returning*', [
            nombre, apellidos, cedula, usuario, contrasena, telefono, email, usuario1
        ]);
        if (result.rowCount === 0)
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}
//ACTUALIZAR UN USUARIO ENTRENADOR 
const updateUsuarioEntrenador = async (req, res, next) => {
    const { usuario1 } = req.params
    try {
        const { nombre, apellidos, cedula, usuario, contrasena, telefono, email } = req.body
        const result = await pool.query('update usuario set rol_id=2,nombre=$1,apellidos=$2,cedula=$3,usuario=$4,contrasena=$5,telefono=$6,email=$7 where usuario=$8 returning*', [
            nombre, apellidos, cedula, usuario, contrasena, telefono, email, usuario1
        ]);
        if (result.rowCount === 0)
            return res.status(404).json({
                message: 'Usuario no encontrado'
            });
        res.json(result.rows[0])
    } catch (error) {
        next(error)
    }
}
module.exports = {
    getAllDeportistas,
    getAllEntrenadores,
    getAllPromociones,
    getAllProductos,
    getAllPedidos,
    getUsuario,
    createUsuarioDep,
    createUsuarioEntre,
    createPromocion,
    createProducto,
    createCliente,
    createProped,
    deleteUsuario,
    deleteProducto,
    updateUsuario,
    updateUsuarioEntrenador,
    getUsuario1,
    createDeportista,
    createEntrenador
}