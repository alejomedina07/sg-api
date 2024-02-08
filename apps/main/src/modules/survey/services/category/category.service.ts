import { Injectable } from '@nestjs/common';
import { ResponseDto } from '../../../../shared/dto/response.dto';
import { CategoryRepository } from 'sg/core/repositories/survey/category/category.repository';
import { CreateCategoryDto } from '../../dto/createCategory.dto';

@Injectable()
export class CategoryService {
  constructor(private categoryRepository: CategoryRepository) {}

  async getCategories(): Promise<ResponseDto> {
    return await this.categoryRepository.getCategories();
  }

  async getCategory(ids: string): Promise<ResponseDto> {
    const idArray = ids.split(',').map((id) => parseInt(id, 10));
    return await this.categoryRepository.getCategory(idArray);
  }

  async createCategory(data: CreateCategoryDto): Promise<ResponseDto> {
    return await this.categoryRepository.createCategory(data);
  }

  async updateCategory(
    id: number,
    data: CreateCategoryDto,
  ): Promise<ResponseDto> {
    return await this.categoryRepository.updateCategory(id, data);
  }
}
