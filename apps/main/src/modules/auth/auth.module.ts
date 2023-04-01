import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "sg/core/entities";
import { AuthService } from "../../services/auth/auth.service";
import { AuthController } from "../../controllers/auth/auth.controller";
import { UserRepository } from "sg/core/repositories/user/user.repository";
import { CryptoService } from "sg/core/services/crypto/crypto.service";
import { JwtStrategy } from "../../strategies/jwt.strategy";
import { JwtModule } from "@nestjs/jwt";
import configurationConfig from "sg/core/configuration/configuration.config";

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
    JwtModule.register( {
      secret: configurationConfig().main.jwt.secret,
      signOptions: { expiresIn: configurationConfig().main.jwt.expired }
    }),
  ],
  controllers:[AuthController],
  providers:[
    UserRepository, AuthService, CryptoService, JwtStrategy
  ]
})
export class AuthModule {}
