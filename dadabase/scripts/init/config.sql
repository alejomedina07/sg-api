insert into "CNFG".list (name, key, description)
values ('Activo', 'statusUser', 'Estado activo'),
       ('Inactivo', 'statusUser', 'Estado inactivo'),
       ('Pendiente', 'statusUser', 'Estado Pendiente'),
       ('Activo', 'statusService', 'Estado activo'),
       ('Inactivo', 'statusService', 'Estado inactivo'),
       ('Pendiente', 'statusService', 'Estado Pendiente'),
       ('Tipo 1', 'typeService', 'Descripción de ejemplo Tipo 1'),
       ('Tipo 2', 'typeService', 'Descripción de ejemplo Tipo 2'),
       ('Tipo 3', 'typeService', 'Descripción de ejemplo Tipo 3'),
       ('Tipo 1', 'typeExpense', 'Descripción de ejemplo'),
       ('Tipo 2', 'typeExpense', 'Descripción de ejemplo'),
       ('Tipo 3', 'typeExpense', 'Descripción de ejemplo'),
       ('Activo', 'statusCustomer', 'Estado activo'),
       ('Inactivo', 'statusCustomer', 'Estado inactivo'),
       ('Pendiente', 'statusCustomer', 'Estado Pendiente'),
       ('Activo', 'statusAppointment', 'Estado activo'),
       ('Inactivo', 'statusAppointment', 'Estado inactivo'),
       ('Pendiente', 'statusAppointment', 'Estado Pendiente'),
       ('Activo', 'statusInventory', 'Estado activo'),
       ('Inactivo', 'statusInventory', 'Estado inactivo'),
       ('Pendiente', 'statusInventory', 'Estado Pendiente'),
       ('CC', 'documentType', 'Cédula de ciudadanía'),
       ('TI', 'documentType', 'Tarjeta de identidad'),
       ('CC DIG', 'documentType', 'Cédula Digital'),
       ('NIT', 'documentType', 'Empresa'),
       ('TE', 'documentType', 'Tarjeta de extranjería');


insert into "USR".rol (name, description)
values ('Admin', 'Administrador de la plataforma'), ('User', 'Usuario de la plataforma');

insert into "USR".privileges (name, description)
values  ('user.list', 'Listar usuarios'),
        ('user.create', 'Crear usuarios'),
        ('user.edit', 'Editar usuarios'),
        ('user.delete', 'Eliminar usuarios'),
        ('appointment.list', 'Listar citas'),
        ('appointment.create', 'Crear citas'),
        ('appointment.edit', 'Editar citas'),
        ('appointment.delete', 'Eliminar citas'),
        ('customer.list', 'Listar clientes'),
        ('customer.create', 'Crear clientes'),
        ('customer.edit', 'Editar clientes'),
        ('customer.delete', 'Eliminar clientes'),
        ('expense.list', 'Listar gastos'),
        ('expense.create', 'Crear gastos'),
        ('expense.edit', 'Editar gastos'),
        ('expense.delete', 'Eliminar gastos'),
        ('inventory.list', 'Listar inventarios'),
        ('inventory.create', 'Crear inventarios'),
        ('inventory.edit', 'Editar inventarios'),
        ('inventory.delete', 'Eliminar inventarios'),
        ('inventory_in_out.list', 'Listar entrada y salida de inventarios'),
        ('inventory_in_out.create', 'Crear entrada y salida de inventarios'),
        ('inventory_in_out.edit', 'Editar entrada y salida de inventarios'),
        ('inventory_in_out.delete', 'Eliminar entrada y salida de inventarios'),
        ('service.list', 'Listar servicios'),
        ('service.create', 'Crear servicios'),
        ('service.edit', 'Editar servicios'),
        ('service.delete', 'Eliminar servicios'),
        ('report.list', 'Listar reportes'),
        ('report.create', 'Crear reportes'),
        ('report.edit', 'Editar reportes'),
        ('report.delete', 'Eliminar reportes'),
        ('turn.list', 'Listar turnos'),
        ('turn.create', 'Crear turnos'),
        ('turn.edit', 'Editar turnos'),
        ('turn.delete', 'Eliminar turnos'),
        ('config.list', 'Listar configuración'),
        ('config.create', 'Crear configuración'),
        ('config.edit', 'Editar configuración'),
        ('config.delete', 'Eliminar configuración');





--
-- insert into "CNFG".list (NAME, KEY, DESCRIPTION)
-- values ('Tipo 1', 'typeService', 'Descripción de ejemplo Tipo 1'),
--        ('Tipo 2', 'typeService', 'Descripción de ejemplo Tipo 2'),
--        ('Tipo 3', 'typeService', 'Descripción de ejemplo Tipo 3');