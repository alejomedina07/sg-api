import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResponseDto } from '../../../shared/dto/response.dto';
import { ListService } from '../services/list.service';
import { GetListDto } from '../dto/getList.dto';
import { CreateListDto } from '../dto/CreateList.dto';
import { Privileges, Roles } from '../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../enums/role.enum';
import { JwtAuthGuard } from '../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../guards/rol/roles.guard';
import { SetCreatedByGuard } from '../../../guards/auth/setCreatedBy.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('config')
export class ListController {
  constructor(private readonly mainService: ListService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.configCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post('list')
  async createList(@Body() data: CreateListDto): Promise<ResponseDto> {
    return await this.mainService.createList(data);
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.configEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put('list/:id')
  async updateList(
    @Param('id') id: number,
    @Body() data: CreateListDto,
  ): Promise<ResponseDto> {
    return await this.mainService.updateList(id, data);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard)
  @Get('list')
  async getList(@Query() params: GetListDto): Promise<ResponseDto> {
    return await this.mainService.getList(params);
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.configList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('list/all-options')
  async getAllOptions(): Promise<ResponseDto> {
    return await this.mainService.getAllOptions();
  }
}
