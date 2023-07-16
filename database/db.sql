CREATE TABLE rol(
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(20) NOT NULL,
    descripcion VARCHAR(100) NOT NULL
);
select * from rol
insert into rol (nombre, descripcion) values('administrador', 'rol administrador del sistema')
insert into rol (nombre, descripcion) values('empleado', 'rol empleado del sistema quien factura')

CREATE TABLE usuario(
    id SERIAL PRIMARY KEY,
    rol_id INTEGER,
    nombre VARCHAR(50) NOT NULL,
    apellidos VARCHAR(150) NOT NULL,
    cedula VARCHAR(20) NOT NULL,
    usuario VARCHAR(100) NOT NULL UNIQUE,
    contrasena VARCHAR (100) NOT NULL ,
    telefono VARCHAR(20),
    email VARCHAR(250),
    CONSTRAINT FK_Usuario_Rol
    foreign key(rol_id)
    references rol(id)
    on update restrict
    on delete restrict
);
select * from usuario
insert into usuario(rol_id,nombre,apellidos,cedula,usuario,contrasena,telefono,email)
values(1,'Micaela','Murillo','123456789','MicMur','1234','012233455','mucmul@gmail.com')
insert into usuario(rol_id,nombre,apellidos,cedula,usuario,contrasena,telefono,email)
values(2,'Daniel','Escribano','123456782','DanEsc','1234','012233455','danesc@gmail.com')

Create table Promociones(
Promotion_code serial primary key,
Promotion_descript varchar(30),
Date_start date,
Date_end date
);
select u.id,r.nombre as rol ,u.nombre,u.apellidos,u.cedula,u.usuario,u.contrasena,u.telefono,u.email from usuario as u inner join rol as r on u.rol_id = r.id where r.id=2
select p.promotion_code as id,p.Promotion_descript as Promocion, p.Date_start as fecha_Inicio, p.Date_end as fecha_Final from Promociones as p
select * from Promociones
insert into promociones(Promotion_descript,Date_start,Date_end)
values('2x1','2023-07-15','2023-07-23')

Create table Producto(
Code_products serial primary key,
code_usuario int not null,
Promotion_code int,
Products_descript varchar(30),
Produtc_price float,
Product_name varchar(30),
Precio float,
stock int,
Foreign Key (Promotion_code) 
references Promociones(Promotion_code),
Foreign Key (code_usuario) 
references usuario(id)
);

DELETE FROM producto;

select p.Code_products as id,u.nombre as Empleado,pr.promotion_descript as promocion, p.Products_descript as descripcion, p.Produtc_price as precio,p.Product_name as producto, p.stock
from producto as p inner join usuario as u on u.id = p.code_usuario  inner join promociones as pr on pr.promotion_code = p.promotion_code where p.code_usuario=u.id

select p.Code_products as id,u.nombre as Empleado,pr.promotion_descript as promocion, p.Products_descript as descripcion, p.Produtc_price as precio,p.Product_name as producto, p.stock from producto as p inner join usuario as u on u.id = p.code_usuario  inner join promociones as pr on pr.promotion_code = p.promotion_code where p.code_usuario=u.id

ALTER TABLE Producto
ALTER COLUMN Promotion_code DROP DEFAULT,
ALTER COLUMN Promotion_code SET DEFAULT NULL;
select * from producto
DELETE FROM Producto WHERE Code_products = 2;
insert into producto (code_usuario,Promotion_code, Products_descript,Produtc_price,Product_name, stock)
values(2,2,'Pizza de 1 revanada de queso',1.25,'Pizza 1 revanada Queso',50);
insert into producto (code_usuario,Promotion_code, Products_descript,Produtc_price,Product_name, stock)
values(4,3,'Pizza de 1 revanada peperoni',1,'Pizza 1revanadaPeperoni',52);

insert into producto (code_usuario,Promotion_code, Products_descript,Produtc_price,Product_name,stock)
values(2,3,'Pizza 1 revanada carne',1.25,'Pizza 1 revanada carne',3);

create table Cliente(
Code_customer serial primary key,
customer_name varchar(30),
customer_phone varchar(20),
Customer_adress varchar(30)
);

insert into cliente (customer_name, customer_phone, Customer_adress)
values ('Luis Vera','0999999999','La cuadra')

Create table Pedido(
Code_order serial primary key,
code_customer int,
code_usuario int not null,
Code_product int,
date_of_order date,
Foreign Key (code_customer) 
references Cliente(Code_customer),
Foreign Key (code_usuario) 
references usuario(id)
);
select * from pedido

select pe.code_order, cl.customer_name, u.nombre,pe.code_product,pe.date_of_order, pro.product_name  from pedido as pe
inner join cliente as cl on  pe.code_customer=cl.code_customer
inner join usuario as u on pe.code_usuario = u.id
inner join producto_Pedido as prpe on pe.code_order=prpe.code_order
inner join producto as pro on prpe.code_products = pro.code_products

CREATE SEQUENCE seq_code_product START 1 INCREMENT 1;

CREATE OR REPLACE FUNCTION format_code_product(num bigint) RETURNS text AS
$$
BEGIN
  RETURN LPAD(num::text, 4, '0');
END;
$$
LANGUAGE plpgsql;

ALTER TABLE Pedido
ALTER COLUMN Code_product SET DEFAULT NEXTVAL('seq_code_product');

select * from pedido

insert into pedido(code_customer,code_usuario,date_of_order )
values (1,2,'2023-07-16')
insert into pedido(code_customer,code_usuario,date_of_order )
values (1,2,'2023-07-16')



Create table Producto_Pedido(
    code_order int not null,
    code_products int not null,
    Foreign Key (code_order) 
    references Pedido(code_order),
    Foreign Key (code_products) 
    references Producto(code_products)
); 
delete from producto_pedido
insert into producto_pedido(code_order, code_products)
values(2,3)

Create table Pago(
Code_payment serial primary key,
Paymenth_method varchar(10),
Paymenth_description varchar(30)
);

insert into pago(paymenth_method,paymenth_description)
values('Efectivo', 'Paga con dinero fisico')

Create table Factura(
Bill_id serial primary key,
Code_order int not null,
code_payment int not null,
Cantidad int,
Product_price float,
Foreign Key (code_order) references Pedido(code_order),
Foreign key(code_payment) references Pago(Code_payment)
);


select * from producto_pedido