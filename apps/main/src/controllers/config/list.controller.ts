import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ResponseDto }                                   from '../../dto/shared/response.dto';
import { ListService }                                   from '../../services/config/list.service';
import { GetListDto }                                    from '../../dto/config/getList.dto';
import { CreateListDto }                                 from '../../dto/config/CreateList.dto';
import { Roles }                                         from '../../decorators/roles.decorator';
import { Role }                                          from '../../enums/role.enum';
import { JwtAuthGuard }                                  from '../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard }                                    from '../../guards/rol/roles.guard';
import { SetCreatedByGuard }                             from '../../guards/auth/setCreatedBy.guard';
import { ApiBearerAuth }                                 from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('config')
export class ListController {
  constructor(private readonly mainService: ListService) {}

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post('list')
  async createList(@Body() data:CreateListDto): Promise<ResponseDto> {
    return await this.mainService.createList(data);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('list')
  async getList(@Query() params:GetListDto): Promise<ResponseDto> {
    return await this.mainService.getList(params);
  }

  @Roles(Role.Admin, Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('list/all-options')
  async getAllOptions(): Promise<ResponseDto> {
    return await this.mainService.getAllOptions();
  }

}
