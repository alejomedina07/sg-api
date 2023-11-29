import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Post,
} from '@nestjs/common';
import { CreateLoginDto, ResponseLogin } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { throws } from 'assert';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  async login(@Body() data: CreateLoginDto): Promise<ResponseLogin> {
    try {
      return await this.authService.login(data);
    } catch (e) {
      throw new HttpException(e, 500);
    }
  }
}
