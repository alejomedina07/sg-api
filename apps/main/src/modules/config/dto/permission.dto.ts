import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class PermissionDto {
  @ApiProperty({ description: 'id del lista', required: false })
  @IsOptional()
  @IsInt({ message: 'id: El id debe ser un número' })
  id?: number;

  @ApiProperty({ description: 'name del lista', required: true })
  @IsDefined({ message: 'name: El name es requerido' })
  @IsString({ message: 'name: El name del lista debe ser texto' })
  name: string;

  @ApiProperty({ description: 'description del lista', required: true })
  @IsDefined({ message: 'description: El description es requerido' })
  @IsString({ message: 'description: El description del lista debe ser texto' })
  description: string;
}

export class PrivilegesPermissionsDto {
  @ApiProperty({ type: [Number], description: 'privileges', required: true })
  @IsDefined({ message: 'privileges: Los privilegios son requerido' })
  @IsNumber({}, { each: true })
  @IsArray()
  @ArrayMinSize(1)
  privileges: number[];

  @ApiProperty({ description: 'permission', required: true })
  @IsDefined({ message: 'permission: El permiso es requerido' })
  permission: PermissionDto;
}

//
// const menu = [
//   { text: 'usuarios', value: 'user' },
//   { text: 'citas', value: 'appointment' },
//   { text: 'clientes', value: 'customer' },
//   { text: 'gastos', value: 'expense' },
//   { text: 'inventarios', value: 'inventory' },
//   { text: 'entrada y salida de inventarios', value: 'inventory_in_out' },
//   { text: 'servicios', value: 'service' },
//   { text: 'reportes', value: 'report' },
//   { text: 'turnos', value: 'turn' },
//   { text: 'configuración', value: 'config' },
// ];
//
// let value = '';
//
// menu.forEach(
//   (item) =>
//     (value += `
//  ('${item.value}.list', 'Listar ${item.text}'),
//  ('${item.value}.create', 'Crear ${item.text}'),
//  ('${item.value}.edit', 'Editar ${item.text}'),
//  ('${item.value}.delete', 'Eliminar ${item.text}'),`),
// );
// console.log(value);

//('user.create', 'Crear Usuario'),
