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
import { ApiBearerAuth } from '@nestjs/swagger';
import { Privileges, Roles } from '../../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../../enums/role.enum';
import { JwtAuthGuard } from '../../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../../guards/rol/roles.guard';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { SetCreatedByGuard } from '../../../../guards/auth/setCreatedBy.guard';
import { CreateAccountPayableDto } from '../../dto/createAccountPayable.dto';
import { AccountPayableService } from '../../services/account-payable/account-payable.service';
import { GetAccountPayableDto } from '../../dto/getAccountPayable.dto';

@ApiBearerAuth()
@Controller('account-payable')
export class AccountPayableController {
  constructor(private accountPayableService: AccountPayableService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.accountPayableList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getAccountPayables(
    @Query() params: GetAccountPayableDto,
  ): Promise<ResponseDto> {
    const response = await this.accountPayableService.getAccountPayables(
      params,
    );
    if (response.code !== 201)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.accountPayableEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get(':id')
  async getAccountPayableById(@Param('id') id: number): Promise<ResponseDto> {
    const response = await this.accountPayableService.getAccountPayableById(id);
    if (response.code !== 201)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.accountPayableCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createAccountPayable(
    @Body() accountPayable: CreateAccountPayableDto,
  ): Promise<ResponseDto> {
    const response = await this.accountPayableService.createAccountPayable(
      accountPayable,
    );
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.accountPayableEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateAccountPayable(
    @Param('id') id: number,
    @Body() accountPayable: CreateAccountPayableDto,
  ): Promise<ResponseDto> {
    const response = await this.accountPayableService.updateAccountPayable(
      id,
      accountPayable,
    );
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }
}
