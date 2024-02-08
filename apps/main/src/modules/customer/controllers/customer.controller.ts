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
import { CustomerService } from '../services/customer.service';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { CreateCustomerDto } from '../dto/createCustomer.dto';
import { Privileges, Roles } from '../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../enums/role.enum';
import { JwtAuthGuard } from '../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../guards/rol/roles.guard';
import { SetCreatedByGuard } from '../../../guards/auth/setCreatedBy.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Customer } from 'sg/core/entities';

@ApiBearerAuth()
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.customerList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getCustomer(): Promise<ResponseDto> {
    const response = await this.customerService.getCustomer();
    if (response.code !== 201)
      throw new HttpException('Error al intentar Obtener!', 404);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.customerList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getCustomerById(
    @Param('id') id: number,
  ): Promise<Customer | ResponseDto> {
    try {
      return await this.customerService.getCustomerById(id);
    } catch (error) {
      // console.log(999, error);
      throw new HttpException('Error al intentar Obtener!', 500);
    }
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.customerCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createCustomer(@Body() data: CreateCustomerDto): Promise<ResponseDto> {
    const response = await this.customerService.createCustomer(data);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.customerEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateCustomer(
    @Param('id') id: number,
    @Body() data: CreateCustomerDto,
  ): Promise<ResponseDto> {
    const response = await this.customerService.updateCustomer(id, data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }
}
