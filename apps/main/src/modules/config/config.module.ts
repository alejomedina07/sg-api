import { Module } from '@nestjs/common';
import { RolService } from './services/rol/rol.service';
import { RolController } from './controllers/rol/rol.controller';
import { PermissionService } from './services/permission/permission.service';
import { PermissionController } from './controllers/permission/permission.controller';
import { RolRepository } from 'sg/core/repositories/config/rol.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'sg/core/entities';

@Module({
  imports: [TypeOrmModule.forFeature([Rol])],
  providers: [RolService, PermissionService, RolRepository],
  controllers: [PermissionController, RolController],
})
export class ConfigModule {}
