import { Injectable } from '@nestjs/common';
import { BannerRepository } from 'sg/core/repositories/banner/banner.repository';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { CreateBannerDto } from '../../dto/createBanner.dto';

@Injectable()
export class BannerService {
  constructor(private bannerRepository: BannerRepository) {}

  async getBanners(list: boolean): Promise<ResponseDto> {
    return this.bannerRepository.getBanners(list);
  }

  async createBanner(banner: CreateBannerDto): Promise<ResponseDto> {
    return this.bannerRepository.createBanner(banner);
  }
  async updateBanner(
    id: number,
    banner: CreateBannerDto,
  ): Promise<ResponseDto> {
    return this.bannerRepository.updateBanner(id, banner);
  }
}
