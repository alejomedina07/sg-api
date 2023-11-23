import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PermissionService } from '../../services/permission/permission.service';
import { PrivilegesPermissionsDto } from '../../dto/permission.dto';
import { ResponseDto } from '../../../dto/shared/response.dto';
import { Roles } from '../../../decorators/roles.decorator';
import { Role } from '../../../enums/role.enum';
import { JwtAuthGuard } from '../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../guards/rol/roles.guard';
import { SetCreatedByGuard } from '../../../guards/auth/setCreatedBy.guard';

@ApiBearerAuth()
@Controller('config/permission')
export class PermissionController {
  constructor(private permissionService: PermissionService) {}

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createPermission(
    @Body() data: PrivilegesPermissionsDto,
  ): Promise<ResponseDto> {
    return this.permissionService.createPermission(data);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getPermission(): Promise<ResponseDto> {
    return this.permissionService.getPermission();
  }
}
