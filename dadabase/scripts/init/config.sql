insert into "CNFG".list (name, key, description)
values ('Activo', 'statusUser', 'Estado activo'),
       ('Inactivo', 'statusUser', 'Estado inactivo'),
       ('Pendiente', 'statusUser', 'Estado Pendiente'),
       ('Activo', 'statusService', 'Estado activo'),
       ('Inactivo', 'statusService', 'Estado inactivo'),
       ('Pendiente', 'statusService', 'Estado Pendiente'),
       ('Activo', 'statusExpense', 'Estado activo'),
       ('Inactivo', 'statusExpense', 'Estado inactivo'),
       ('Pendiente', 'statusExpense', 'Estado Pendiente'),
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


insert into "CNFG".list (NAME, KEY, DESCRIPTION)
values ('Activo', 'statusService', 'Estado activo'),
       ('Inactivo', 'statusService', 'Estado inactivo'),
       ('Pendiente', 'statusService', 'Estado Pendiente');