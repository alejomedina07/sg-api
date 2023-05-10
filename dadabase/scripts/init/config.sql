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

--
-- insert into "CNFG".list (NAME, KEY, DESCRIPTION)
-- values ('Tipo 1', 'typeService', 'Descripción de ejemplo Tipo 1'),
--        ('Tipo 2', 'typeService', 'Descripción de ejemplo Tipo 2'),
--        ('Tipo 3', 'typeService', 'Descripción de ejemplo Tipo 3');