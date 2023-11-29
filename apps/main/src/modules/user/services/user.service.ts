import { ExecutionContext, Injectable, Req } from '@nestjs/common';
import { UserRepository } from 'sg/core/repositories/user/user.repository';
import { User } from 'sg/core/entities';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { CryptoService } from 'sg/core/services/crypto/crypto.service';
import { PaginationDto } from '../../../shared/dto/pagination.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private cryptoService: CryptoService,
  ) {}
  async getUsers(params: PaginationDto): Promise<ResponseDto> {
    return this.userRepository.getUsers(params);
  }

  async createUser(user: User): Promise<any> {
    user.password = await this.cryptoService.encryptPassword(user.password);
    return this.userRepository.createUser(user);
  }

  async updateUser(id: number, user: User): Promise<any> {
    if (user.password)
      user.password = await this.cryptoService.encryptPassword(user.password);
    return this.userRepository.updateUser(id, user);
  }
}
