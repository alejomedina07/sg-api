import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { RolService } from '../../services/rol/rol.service';
import { Privileges, Roles } from '../../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../../enums/role.enum';
import { JwtAuthGuard } from '../../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../../guards/rol/roles.guard';
import { SetCreatedByGuard } from '../../../../guards/auth/setCreatedBy.guard';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { RolPermissionDto } from '../../dto/rol.dto';

@ApiBearerAuth()
@Controller('config/rol')
export class RolController {
  constructor(private rolService: RolService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.configCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createRol(@Body() data: RolPermissionDto): Promise<ResponseDto> {
    return this.rolService.createRol(data);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Privileges(Privilege.configList)
  @Get()
  async getRol(): Promise<ResponseDto> {
    return this.rolService.getRol();
  }
}
