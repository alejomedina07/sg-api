import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PermissionService } from '../../services/permission/permission.service';
import { PrivilegesPermissionsDto } from '../../dto/permission.dto';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { Privileges, Roles } from '../../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../../enums/role.enum';
import { JwtAuthGuard } from '../../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../../guards/rol/roles.guard';
import { SetCreatedByGuard } from '../../../../guards/auth/setCreatedBy.guard';

@ApiBearerAuth()
@Controller('config/permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Roles(Role.Admin)
  @Privileges(Privilege.configCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createPermission(
    @Body() data: PrivilegesPermissionsDto,
  ): Promise<ResponseDto> {
    return this.permissionService.createPermission(data);
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.configList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getPermission(): Promise<ResponseDto> {
    return this.permissionService.getPermission();
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.configList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/privileges')
  async getPrivileges(): Promise<ResponseDto> {
    return this.permissionService.getPrivileges();
  }
}
