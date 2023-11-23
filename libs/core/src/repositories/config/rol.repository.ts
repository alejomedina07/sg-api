import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { ResponseDto } from '../../../../../apps/main/src/dto/shared/response.dto';
import {
  Permissions,
  PermissionsPrivileges,
  Rol,
  RolPermissions,
  RolPrivileges,
} from 'sg/core/entities';
import { PrivilegesPermissionsDto } from '../../../../../apps/main/src/config/dto/permission.dto';
import { RolPermissionDto } from '../../../../../apps/main/src/config/dto/rol.dto';

@Injectable()
export class RolRepository {
  constructor(
    @InjectRepository(Rol) private rolRepository: Repository<Rol>,
    private readonly entityManager: EntityManager,
  ) {}

  async getPermission(): Promise<ResponseDto> {
    try {
      let data: any = await this.rolRepository.manager.find(Permissions, {
        select: ['id', 'name', 'description'],
        order: { name: 'ASC' },
        relations: [
          'permissionsPrivileges',
          'permissionsPrivileges.privileges',
        ],
        // skip: (page - 1) * limit || 0,
        // take: limit || 1000,
      });

      data = data.map((permission) => ({
        id: permission.id,
        name: permission.name,
        description: permission.description,
        privileges: permission.permissionsPrivileges.map((privilege) => ({
          id: privilege.privileges.id,
          name: privilege.privileges.name,
          description: privilege.privileges.description,
        })),
      }));
      return { data, msg: 'Obtenido correctamente!', code: 201 };
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al obtener' };
    }
  }

  async createPermission(data: PrivilegesPermissionsDto): Promise<ResponseDto> {
    try {
      console.log(777);

      return this.entityManager.transaction(async (entityManager) => {
        console.log(2);
        const permission = await entityManager.insert(
          Permissions,
          data.permission,
        );
        console.log(8);

        const permissionsPrivilegesToInsert = data.privileges.map(
          (privilegesId) => ({
            permissionsId: permission.identifiers[0].id,
            privilegesId,
          }),
        );

        console.log(1, permissionsPrivilegesToInsert);
        // Insertar todos los registros en permissions_privileges en una sola operación
        await entityManager.insert(
          PermissionsPrivileges,
          permissionsPrivilegesToInsert,
        );
        return { success: true, msg: 'Creado exitosamente!', code: 200 };
      });
    } catch (e) {
      console.log(6, e);
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async createRol(data: RolPermissionDto): Promise<any> {
    try {
      return this.entityManager.transaction(async (entityManager) => {
        console.log(1);
        const rolSaved = await entityManager.insert(Rol, data.rol);
        const rolId = rolSaved.identifiers[0].id;
        const rolPermissionsToInsert = data.permissionsId.map(
          (permissionsId) => ({
            rolId,
            permissionsId,
          }),
        );

        await entityManager.insert(RolPermissions, rolPermissionsToInsert);

        const RolPrivilegesToInsert = data.privilegesId.map((privilegesId) => ({
          rolId,
          privilegesId,
        }));
        await entityManager.insert(RolPrivileges, RolPrivilegesToInsert);
        return { success: true, msg: 'Creado exitosamente!', code: 200 };
      });
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  // async updateRol(id: number, data: GetListDto): Promise<any> {
  //   try {
  //     const userInsert = await this.rolRepository.update(id, data);
  //     return {
  //       data: userInsert.raw,
  //       msg: 'Item de la lista Creado exitosamente!',
  //       code: 200,
  //     };
  //   } catch (e) {
  //     return { code: 500, msg: 'Error al intentar guardar' };
  //   }
  // }

  async getRol(): Promise<ResponseDto> {
    try {
      return {
        data: await this.rolRepository.manager.find(Rol, {
          select: ['id', 'name', 'description', 'status'],
          where: { status: true },
          relations: [
            'rolPermissions',
            'rolPermissions.permissions',
            'rolPrivileges',
            'rolPrivileges.privileges',
          ],
          order: { name: 'ASC' },
          // skip: (page - 1) * limit || 0,
          // take: limit || 1000,
        }),
        msg: 'Obtenido correctamente!!',
        code: 201,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al obtener' };
    }
  }
}
