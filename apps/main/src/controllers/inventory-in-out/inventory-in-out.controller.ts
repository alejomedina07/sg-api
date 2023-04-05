import { Body, Controller, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ResponseDto }                                                       from "../../dto/shared/response.dto";
import { InventoryInOutService }                                 from "../../services/inventory-in-out/inventory-in-out.service";
import { CreateInventoryInOutDto }                               from "../../dto/inventoryInOut/createInventoryInOut.dto";
import { ApiBearerAuth }                                         from '@nestjs/swagger';
import { Roles }                                                 from '../../decorators/roles.decorator';
import { Role }                                                  from '../../enums/role.enum';
import { JwtAuthGuard }                                          from '../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard }                                            from '../../guards/rol/roles.guard';
import { SetCreatedByGuard }                                     from '../../guards/auth/setCreatedBy.guard';

@ApiBearerAuth()
@Controller('inventory-in-out')
export class InventoryInOutController {
  constructor(private inventoryInOutService: InventoryInOutService) {
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getExpense(): Promise<ResponseDto> {
    const response = await this.inventoryInOutService.getInventoryInOut()
    if ( response.code !== 201 ) throw new HttpException('Error al intentar obtener', 404)
    return response;
  }


  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createExpense(@Body() data: CreateInventoryInOutDto): Promise<ResponseDto> {
    const response =  await this.inventoryInOutService.createInventoryInOut(data);
    if (response.code !== 200 ) throw new HttpException('Error al intentar guardar', 500)
    return response;
  }


  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Put(':id')
  async updateExpense(@Param('id') id: number, @Body() data: CreateInventoryInOutDto): Promise<ResponseDto> {
    const response =  await this.inventoryInOutService.updateInventoryInOut(id, data);
    if (response.code !== 200 ) throw new HttpException('Error al intentar guardar', 500)
    return response;
  }
}
