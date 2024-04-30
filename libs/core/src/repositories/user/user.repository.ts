import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { PermissionsPrivileges, Privileges, User } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';
import { PaginationDto } from '../../../../../apps/main/src/shared/dto/pagination.dto';
import { UpdateProfileDto } from '../../../../../apps/main/src/modules/user/dto/updateProfile.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createUser(data: User): Promise<any> {
    console.log(77777, data);
    try {
      const userInsert = await this.userRepository.manager.insert(User, data);
      return {
        data: userInsert.identifiers[0].id,
        msg: 'Usuario Creado!',
        code: 200,
      };
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async updateUser(id: number, data: User): Promise<any> {
    try {
      const userInsert = await this.userRepository.update(id, data);
      return { data: userInsert.raw, msg: 'Usuario Actualizado!', code: 200 };
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async updateProfile(data: UpdateProfileDto): Promise<any> {
    try {
      console.log(777, data);
      const userInsert = await this.userRepository.update(data.createdById, {
        address: data.address,
        phoneNumber: data.phoneNumber,
        password: data.password,
      });
      return { data: userInsert.raw, msg: 'Usuario Actualizado!', code: 200 };
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async getUsersToList(): Promise<ResponseDto> {
    try {
      const data = await this.userRepository.manager.find(User, {
        select: ['id', 'firstName', 'lastName'],
        // where: { status: true }, // TODO
        order: { firstName: 'ASC' },
      });
      return {
        data: data.map((x) => {
          return { id: x.id, name: `${x.firstName} ${x.lastName}` };
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(e);
      return { code: 404, msg: 'Error al obtener' };
    }
  }

  async getUsers(params: PaginationDto): Promise<ResponseDto> {
    try {
      const [users, totalRecords] =
        await this.userRepository.manager.findAndCount(User, {
          select: [
            'id',
            'firstName',
            'lastName',
            'rol',
            'rolId',
            'address',
            'bloodType',
            'documentTypeId',
            'statusId',
            'status',
            'documentType',
            'documentNumber',
            'createdAt',
            'email',
            'phoneNumber',
          ],
          relations: ['rol', 'status', 'documentType'],
          where: { status: true },
          order: { firstName: 'ASC' },
          // skip : ((page-1) * limit) || 0,
          // take: limit || 1000
        });

      return {
        data: users,
        total: totalRecords,
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(e);
      return { code: 404, msg: 'Error al obtener' };
    }
  }

  async findOneUser(phoneNumber: string): Promise<User> {
    const user = await this.userRepository.manager.findOneOrFail(User, {
      // select: ['id', 'firstName', 'lastName', 'phoneNumber', 'password', 'rol'],
      // relations: ['rol', 'rol.permissions'],
      relations: ['rol', 'rol.rolPermissions', 'rol.rolPrivileges'],
      where: { phoneNumber },
    });

    // const rolPermissions = await this.userRepository.manager.findOneOrFail(
    //   RolPermissions,
    //   {
    //     where: { rolId: user.rolId },
    //   },
    // );

    // // Aplanar la estructura de relaciones para obtener todos los privilegios en un solo arreglo
    // const allPrivileges = user.rols.reduce((privileges, rol) => {
    //   rol.rolPermissions.forEach((rolPermission) => {
    //     privileges.push(
    //       ...rolPermission.permissions.rolPermissions.map(
    //         (perm) => perm.privileges,
    //       ),
    //     );
    //   });
    //
    //   rol.rolPrivileges.forEach((rolPrivilege) => {
    //     privileges.push(rolPrivilege.privileges);
    //   });
    //
    //   return privileges;
    // }, []);

    // Ahora, 'allPrivileges' contendrá todos los privilegios del usuario en un solo arreglo
    // console.log(777, allPrivileges);

    if (typeof user.rol !== 'string') {
      const rolPermissionsId = user.rol.rolPermissions.map(
        (item) => item.permissionsId,
      );
      const rolPrivilegesId = user.rol.rolPrivileges.map(
        (item) => item.privilegesId,
      );
      // console.log(777, user.rol.rolPrivileges);
      const permissionsPrivileges = await this.userRepository.manager.find(
        PermissionsPrivileges,
        {
          where: { permissionsId: In(rolPermissionsId) },
        },
      );
      const allPrivileges = await this.userRepository.manager.find(Privileges, {
        where: {
          id: In([
            ...rolPrivilegesId,
            ...permissionsPrivileges.map((item) => item.privilegesId),
          ]),
        },
      });
      console.log(777, allPrivileges);
      const privileges = allPrivileges.map((item) => item.name);
      console.log(666, privileges);
      user.privileges = privileges;
    }

    return user;
  }
}
