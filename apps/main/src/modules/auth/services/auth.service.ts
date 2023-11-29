import { Injectable } from '@nestjs/common';
import { UserRepository } from 'sg/core/repositories/user/user.repository';
import { CreateLoginDto, ResponseLogin } from '../dto/login.dto';
import { CryptoService } from 'sg/core/services/crypto/crypto.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private cryptoService: CryptoService,
    private jwtService: JwtService,
  ) {}

  async login(data: CreateLoginDto): Promise<ResponseLogin> {
    // let response:ResponseLogin = { msg: 'Usuario o contraseña incorrecta' };
    const { phoneNumber, password } = data;
    const user = await this.userRepository.findOneUser(phoneNumber);
    console.log(888, user);
    if (user) {
      const compare = await this.cryptoService.comparePassword(
        password,
        user.password,
      );
      if (compare) {
        delete user.password;

        if (typeof user.rol !== 'string') {
          user.rol = user.rol.name;
        }
        return {
          user,
          token: this.jwtService.sign({ user }),
          msg: 'Bienvenido a la plataforma!!',
        };
      }
    }
    // return response
    throw { msg: 'Usuario o contraseña incorrecta' };
  }
}
