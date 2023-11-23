import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResponseDto } from '../../dto/shared/response.dto';
import { InventoryService } from '../../services/inventory/inventory.service';
import { CreateInventoryDto } from '../../dto/inventory/createInventory.dto';
import { Roles } from '../../decorators/roles.decorator';
import { Role } from '../../enums/role.enum';
import { JwtAuthGuard } from '../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../guards/rol/roles.guard';
import { SetCreatedByGuard } from '../../guards/auth/setCreatedBy.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaginationDto } from '../../dto/shared/pagination.dto';

@ApiBearerAuth()
@Controller('inventory')
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getInventory(): Promise<ResponseDto> {
    const response = await this.inventoryService.getInventory();
    if (response.code !== 201)
      throw new HttpException('Error al intentar obtener', 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createInventory(
    @Body() data: CreateInventoryDto,
  ): Promise<ResponseDto> {
    const response = await this.inventoryService.createInventory(data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar guardar', 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateInventory(
    @Param('id') id: number,
    @Body() data: CreateInventoryDto,
  ): Promise<ResponseDto> {
    const response = await this.inventoryService.updateInventory(id, data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar guardar', 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('/:id')
  async getInventoryById(
    @Param('id') id: number,
    @Query() params: PaginationDto,
  ): Promise<ResponseDto> {
    const response = await this.inventoryService.getInventoryById(id, params);
    if (response.code !== 200)
      throw new HttpException('Error al intentar obtener', 404);
    return response;
  }
}
