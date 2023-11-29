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
import { ExpenseService } from '../services/expense.service';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { CreateExpenseDto } from '../dto/createExpense.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Privileges, Roles } from '../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../enums/role.enum';
import { JwtAuthGuard } from '../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../guards/rol/roles.guard';
import { SetCreatedByGuard } from '../../../guards/auth/setCreatedBy.guard';

@ApiBearerAuth()
@Controller('expense')
export class ExpenseController {
  constructor(private expenseService: ExpenseService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.expenseList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getExpense(): Promise<ResponseDto> {
    const response = await this.expenseService.getExpenses();
    if (response.code !== 201)
      throw new HttpException('Error al intentar obtener', 404);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.expenseCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createExpense(@Body() data: CreateExpenseDto): Promise<ResponseDto> {
    const response = await this.expenseService.createExpense(data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar guardar', 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.expenseEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateExpense(
    @Param('id') id: number,
    @Body() data: CreateExpenseDto,
  ): Promise<ResponseDto> {
    const response = await this.expenseService.updateExpense(id, data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar guardar', 500);
    return response;
  }
}
