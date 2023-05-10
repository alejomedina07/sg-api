import { Body, Controller, Get, HttpException, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CustomerService }                                                   from '../../services/customer/customer.service';
import { ResponseDto }                                           from '../../dto/shared/response.dto';
import { CreateCustomerDto }                                     from '../../dto/customer/createCustomer.dto';
import { Roles }                                                 from '../../decorators/roles.decorator';
import { Role }                                                  from '../../enums/role.enum';
import { JwtAuthGuard }                                          from '../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard }                                            from '../../guards/rol/roles.guard';
import { SetCreatedByGuard }                                     from '../../guards/auth/setCreatedBy.guard';
import { ApiBearerAuth }                                         from '@nestjs/swagger';
import { Customer } from 'sg/core/entities';

@ApiBearerAuth()
@Controller('customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getCustomer(): Promise<ResponseDto> {
    const response = await this.customerService.getCustomer()
    if (response.code !== 201) throw new HttpException( 'Error al intentar Obtener!', 404 )
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getCustomerById(@Param('id') id:number): Promise<Customer | ResponseDto> {
    console.log('this id: ', id);
    try {
      const customer = await this.customerService.getCustomerById(id);
      return customer;
    } catch (error) {
      // console.log(999, error);
      throw new HttpException( 'Error al intentar Obtener!', 500 )
    }
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createCustomer(@Body() data: CreateCustomerDto): Promise<ResponseDto> {
    const response = await this.customerService.createCustomer(data);
    if (response.code !== 200) throw new HttpException( 'Error al intentar Obtener!', 500 )
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateCustomer(@Param('id') id: number, @Body() data: CreateCustomerDto): Promise<ResponseDto> {
    const response = await this.customerService.updateCustomer(id, data);
    if (response.code !== 200) throw new HttpException( 'Error al intentar Obtener!', 500 )
    return response;
  }
}
