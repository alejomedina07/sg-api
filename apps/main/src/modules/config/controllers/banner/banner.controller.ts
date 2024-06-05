import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { BannerService } from '../../services/banner/banner.service';
import { Privileges, Roles } from '../../../../decorators/roles.decorator';
import { Privilege, Role } from '../../../../enums/role.enum';
import { JwtAuthGuard } from '../../../../guards/auth/jwtAuthGuard.guard';
import { RolesGuard } from '../../../../guards/rol/roles.guard';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { CreateBannerDto } from '../../dto/createBanner.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileFilter, renameImage } from '../../../../helpers/images.helper';
import { SetCreatedByGuard } from '../../../../guards/auth/setCreatedBy.guard';

@ApiBearerAuth()
@Controller('banner')
export class BannerController {
  constructor(private bannerService: BannerService) {}

  @Roles(Role.Admin)
  @Privileges(Privilege.configList)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get()
  async getBanners(): Promise<ResponseDto> {
    const response = await this.bannerService.getBanners(false);
    if (response.code !== 201)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Get('/list')
  async getBannersList(): Promise<ResponseDto> {
    const response = await this.bannerService.getBanners(true);
    if (response.code !== 201)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.configCreate)
  @UseGuards(JwtAuthGuard, RolesGuard, SetCreatedByGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: renameImage,
      }),
      fileFilter: fileFilter,
    }),
  )
  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        status: {
          type: 'boolean',
        },
      },
    },
  })
  async createBanner(
    @Body() banner: CreateBannerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseDto> {
    console.log('file::::', file);
    if (file?.filename) banner.photo = file.filename;
    const response = await this.bannerService.createBanner(banner);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }

  @Roles(Role.Admin)
  @Privileges(Privilege.configEdit)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: renameImage,
      }),
      fileFilter: fileFilter,
    }),
  )
  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: {
          type: 'number',
          format: 'binary',
        },
        file: {
          type: 'string',
          format: 'binary',
        },
        name: {
          type: 'string',
        },
        description: {
          type: 'string',
        },
        status: {
          type: 'boolean',
        },
      },
    },
  })
  async updateBanner(
    @Param('id') id: number,
    @Body() banner: CreateBannerDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<ResponseDto> {
    if (file?.filename) banner.photo = file.filename;
    const response = await this.bannerService.updateBanner(id, banner);
    if (response.code !== 200)
      throw new HttpException(response.msg || 'Error!!', response.code || 500);
    return response;
  }
}
