import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseBoolPipe,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Privileges, Roles } from '../../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../../enums/role.enum';
import { JwtAuthGuard } from '../../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../../guards/rol/roles.guard';
import { SetCreatedByGuard } from '../../../../guards/auth/setCreatedBy.guard';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { ProviderService } from '../../services/provider/provider.service';
import { CreateProviderDto } from '../../dto/createProvider.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('provider')
export class ProviderController {
  constructor(private providerService: ProviderService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.providerList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getProviders(
    @Query('list', ParseBoolPipe) list: boolean,
  ): Promise<ResponseDto> {
    return await this.providerService.getProviders(list);
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.providerList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':providerId')
  async getProviderById(
    @Param('providerId') providerId: number,
  ): Promise<ResponseDto> {
    return await this.providerService.getProviderById(providerId);
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.providerCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createProvider(
    @Body() provider: CreateProviderDto,
  ): Promise<ResponseDto> {
    const response = await this.providerService.createProvider(provider);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.providerEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateProvider(
    @Param('id') id: number,
    @Body() provider: CreateProviderDto,
  ): Promise<ResponseDto> {
    const response = await this.providerService.updateProvider(id, provider);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }
}
