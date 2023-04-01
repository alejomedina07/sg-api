import { Injectable } from '@nestjs/common';
import { InjectRepository }                                  from '@nestjs/typeorm';
import { Repository }                      from 'typeorm';
import { User }                       from "sg/core/entities";
import { ResponseDto }                     from "../../../../../apps/main/src/dto/shared/response.dto";
import { PaginationDto }                   from '../../../../../apps/main/src/dto/shared/pagination.dto';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,

  ) {}

  async createUser(data: User): Promise<any> {
    try {
      const userInsert = await this.userRepository.manager.insert(User, data);
      return { data: userInsert.identifiers[0].id, msg: 'Usuario Creado!', code: 200 }
    } catch (e) {
      console.log(12, e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data:e }
    }
  }

  async getUsers(params: PaginationDto): Promise<ResponseDto> {
    try {
      const { page, limit } = params;
      // const request = this.context.switchToHttp().getRequest();
      // const user = request.user;
      // console.log(12, user);
      const users = await this.userRepository.manager.find( User, {
        select:['id', 'firstName', 'lastName', 'rol', 'status', 'documentType', 'documentNumber', 'createdAt', 'email', 'phoneNumber'],
        // select: { id: true, rol: true, lastName:true, email:true },
        relations:[ 'rol', 'status', 'documentType'],
        // relations: { rol: {id:true, name:true}},
        where: { status: true,  },
        // skip : ((page-1) * limit) || 0,
        // take: limit || 1000
      });

      return { data: users, msg: 'Obtenido correctamente!', code: 201 }
    } catch (e) {
      console.log(e);
      return { code: 404, msg: 'Error al obtener' }
    }
  }

  async findOneUser( phoneNumber: string): Promise<User> {
    return  await this.userRepository.manager.findOne(User, { select:['id', 'firstName', 'lastName', 'phoneNumber', 'password', 'rol'], relations: ['rol'], where:{phoneNumber} })
    // return await this.userRepository.manager.findOneBy( User, { email, status:'active' } )
  }
}
