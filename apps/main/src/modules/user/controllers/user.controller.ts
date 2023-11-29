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
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { ResponseDto } from '../../../shared/dto/response.dto';

import { Privileges, Roles } from '../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../enums/role.enum';

import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../guards/rol/roles.guard';
import { PaginationDto } from '../../../shared/dto/pagination.dto';
import { SetCreatedByGuard } from '../../../guards/auth/setCreatedBy.guard';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly mainService: UserService) {}

  @Roles(Role.Admin, Role.User)
  @Privileges(Privilege.userList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getUsers(@Query() params: PaginationDto): Promise<ResponseDto> {
    return await this.mainService.getUsers(params);
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.userCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<ResponseDto> {
    const response = await this.mainService.createUser(user);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.userEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Put(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() user: CreateUserDto,
  ): Promise<ResponseDto> {
    const response = await this.mainService.updateUser(id, user);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  // @UseInterceptors(
  //   FileInterceptor(
  //     'file',
  //     {
  //       storage: diskStorage({
  //         destination: './uploads',
  //         filename: renameImage,
  //       }),
  //       fileFilter: fileFilter
  //     }
  //   )
  // )
  // @Post('/file')
  // uploadFile(@UploadedFile() file: Express.Multer.File) {
  //   return file.filename
  // }
  //
  //
  // @UseGuards(RolesGuard)
  // // @UseGuards(AuthGuard(), RolesGuard)
  // @Roles(Role.Admin)
  // @Get('/copy-file')
  // copyFile() {
  //   console.log('entrea')
  //   // fs.copyFileSync(
  //   //   './uploads/cc56f5f8-c910-46e9-867c-8e84721aa780-3bd8cc56f5f8-c910-46e9-867c-8e84721aa780.jpeg',
  //   //     './copies/alejito.jpeg',
  //   // )
  //   return 'holis'
  // }
}
