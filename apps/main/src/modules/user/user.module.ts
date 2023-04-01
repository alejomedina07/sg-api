import { ExecutionContext, Injectable, Module } from '@nestjs/common';
import { TypeOrmModule }                        from "@nestjs/typeorm";
import { User } from "sg/core/entities";
import { UserService } from "../../services/user/user.service";
import { UserRepository } from "sg/core/repositories/user/user.repository";
import { CryptoService } from "sg/core/services/crypto/crypto.service";
import { UserController } from "../../controllers/user/user.controller";

@Module({
  imports:[
    TypeOrmModule.forFeature([User]),
  ],
  controllers:[UserController],
  providers:[
    UserService, UserRepository, CryptoService
  ]
})
export class UserModule {}
