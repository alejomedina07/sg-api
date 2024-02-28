import { Injectable } from '@nestjs/common';
import { ProviderRepository } from 'sg/core/repositories/provider/provider.repository';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { Provider } from 'sg/core/entities';
import { CreateProviderDto } from '../../dto/createProvider.dto';

@Injectable()
export class ProviderService {
  constructor(private providerRepository: ProviderRepository) {}

  async getProviders(list: boolean): Promise<ResponseDto> {
    return this.providerRepository.getProviders(list);
  }

  async getProviderById(providerId: number): Promise<ResponseDto> {
    return this.providerRepository.getProviderById(providerId);
  }

  async createProvider(provider: CreateProviderDto): Promise<any> {
    return this.providerRepository.createProvider(provider);
  }

  async updateProvider(id: number, provider: Provider): Promise<any> {
    return this.providerRepository.updateProvider(id, provider);
  }
}
