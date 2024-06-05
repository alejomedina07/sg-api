import { Injectable } from '@nestjs/common';
import { User } from 'sg/core/entities';
import { UserRepository } from 'sg/core/repositories/user/user.repository';
import { CryptoService } from 'sg/core/services/crypto/crypto.service';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { PaginationDto } from '../../../shared/dto/pagination.dto';
import { UpdateProfileDto } from '../dto/updateProfile.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private cryptoService: CryptoService,
  ) {}
  async getUsers(params: PaginationDto): Promise<ResponseDto> {
    return this.userRepository.getUsers(params);
  }

  async getUsersToList(): Promise<ResponseDto> {
    return this.userRepository.getUsersToList();
  }

  async createUser(user: User): Promise<ResponseDto> {
    user.password = await this.cryptoService.encryptPassword(user.password);
    return this.userRepository.createUser(user);
  }

  async updateUser(id: number, user: User): Promise<ResponseDto> {
    if (user.password) {
      user.password = await this.cryptoService.encryptPassword(user.password);
      delete user.passwordConfirm;
    }

    return this.userRepository.updateUser(id, user);
  }

  async updateProfile(user: UpdateProfileDto): Promise<ResponseDto> {
    if (user.password && user.password === user.confirmPassword)
      user.password = await this.cryptoService.encryptPassword(user.password);
    return this.userRepository.updateProfile(user);
  }
}
