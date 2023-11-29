import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { InventoryInOutService } from '../services/inventory-in-out.service';
import { CreateInventoryInOutDto } from '../dto/createInventoryInOut.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Privileges, Roles } from '../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../enums/role.enum';
import { JwtAuthGuard } from '../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../guards/rol/roles.guard';
import { SetCreatedByGuard } from '../../../guards/auth/setCreatedBy.guard';

@ApiBearerAuth()
@Controller('inventory-in-out')
export class InventoryInOutController {
  constructor(private inventoryInOutService: InventoryInOutService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.inventory_in_outList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getInventoryInOut(): Promise<ResponseDto> {
    const response = await this.inventoryInOutService.getInventoryInOut();
    if (response.code !== 201)
      throw new HttpException('Error al intentar obtener', 404);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.inventory_in_outCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createInventoryInOut(
    @Body() data: CreateInventoryInOutDto,
  ): Promise<ResponseDto> {
    const response = await this.inventoryInOutService.createInventoryInOut(
      data,
    );
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error al intentar guardar', 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.inventory_in_outEdit)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Put(':id')
  async updateInventoryInOut(
    @Param('id') id: number,
    @Body() data: CreateInventoryInOutDto,
  ): Promise<ResponseDto> {
    const response = await this.inventoryInOutService.updateInventoryInOut(
      id,
      data,
    );
    if (response.code !== 200)
      throw new HttpException('Error al intentar guardar', 500);
    return response;
  }
}
