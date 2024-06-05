import { Module } from '@nestjs/common';
import { RolService } from './services/rol/rol.service';
import { RolController } from './controllers/rol/rol.controller';
import { PermissionService } from './services/permission/permission.service';
import { PermissionController } from './controllers/permission/permission.controller';
import { RolRepository } from 'sg/core/repositories/config/rol.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner, Rol } from 'sg/core/entities';
import { BannerRepository } from 'sg/core/repositories/banner/banner.repository';
import { BannerService } from './services/banner/banner.service';
import { BannerController } from './controllers/banner/banner.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Rol, Banner])],
  providers: [RolService, PermissionService, RolRepository, BannerRepository, BannerService],
  controllers: [PermissionController, RolController, BannerController],
})
export class ConfigModule {}
