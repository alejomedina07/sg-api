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
import { CategoryService } from '../../services/category/category.service';
import { Privileges, Roles } from '../../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../../enums/role.enum';
import { JwtAuthGuard } from '../../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../../guards/rol/roles.guard';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { CreateCategoryDto } from '../../dto/createCategory.dto';

@ApiBearerAuth()
@Controller('survey/category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.surveyAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getCategories(): Promise<ResponseDto> {
    const response = await this.categoryService.getCategories();
    if (response.code !== 201)
      throw new HttpException('Error al intentar Obtener!', 404);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.surveyAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('by-ids')
  async getCategory(@Query('ids') ids: string): Promise<ResponseDto> {
    const response = await this.categoryService.getCategory(ids);
    if (response.code !== 201)
      throw new HttpException('Error al intentar Obtener!', 404);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.surveyAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Post()
  async createCategory(@Body() data: CreateCategoryDto): Promise<ResponseDto> {
    const response = await this.categoryService.createCategory(data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.surveyAdmin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateCustomer(
    @Param('id') id: number,
    @Body() data: CreateCategoryDto,
  ): Promise<ResponseDto> {
    const response = await this.categoryService.updateCategory(id, data);
    if (response.code !== 200)
      throw new HttpException('Error al intentar Obtener!', 500);
    return response;
  }
}
