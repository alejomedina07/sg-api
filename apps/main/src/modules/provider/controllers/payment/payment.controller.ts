import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PaymentService } from '../../services/payment/payment.service';
import { Privileges, Roles } from '../../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../../enums/role.enum';
import { JwtAuthGuard } from '../../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../../guards/rol/roles.guard';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { SetCreatedByGuard } from '../../../../guards/auth/setCreatedBy.guard';
import { CreatePaymentDto } from '../../dto/createPayment.dto';

@ApiBearerAuth()
@Controller('payment')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.paymentList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getPayments(): Promise<ResponseDto> {
    return await this.paymentService.getPayments();
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.paymentCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createPayment(@Body() payment: CreatePaymentDto): Promise<ResponseDto> {
    console.log(456789);
    const response = await this.paymentService.createPayment(payment);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  // @Roles(Role.Admin)
  // @Privileges(Privilege.paymentEdit)
  // @UseGuards(JwtAuthGuard, RolesGuard)
  // @Put(':id')
  // async updatePayment(
  //   @Param('id') id: number,
  //   @Body() payment: PaymentDto,
  // ): Promise<ResponseDto> {
  //   const response = await this.paymentService.updatePayment(id, payment);
  //   if (response.code !== 200)
  //     throw new HttpException(response.msg || 'Error!!', response.code || 500);
  //   return response;
  // }
}
