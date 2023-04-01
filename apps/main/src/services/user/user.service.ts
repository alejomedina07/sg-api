import { ExecutionContext, Injectable, Req } from '@nestjs/common';
import { UserRepository }                    from "sg/core/repositories/user/user.repository";
import { User }           from "sg/core/entities";
import { ResponseDto }    from "../../dto/shared/response.dto";
import { CryptoService }  from 'sg/core/services/crypto/crypto.service';
import { PaginationDto }  from '../../dto/shared/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository, private cryptoService: CryptoService
  ) {}
  async getUsers(params: PaginationDto): Promise<ResponseDto> {
    return this.userRepository.getUsers(params);
  }

  async createUser(user: User): Promise<any> {
    user.password = await this.cryptoService.encryptPassword(user.password);
    return this.userRepository.createUser(user);
  }

}
