import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Category } from 'sg/core/entities';
import { ResponseDto } from '../../../../../../apps/main/src/shared/dto/response.dto';

@Injectable()
export class CategoryRepository {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(data: Category): Promise<any> {
    try {
      const categoryInsert = await this.categoryRepository.manager.insert(
        Category,
        data,
      );
      return {
        data: categoryInsert.identifiers[0].id,
        msg: 'Cuestionario creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async updateCategory(id: number, data: Category): Promise<any> {
    try {
      const categoryInsert = await this.categoryRepository.update(id, data);
      return {
        data: categoryInsert.raw,
        msg: 'Cuestionario creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async getCategories(): Promise<ResponseDto> {
    try {
      return {
        data: await this.categoryRepository.manager.find(Category, {
          order: { id: 'desc' },
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(e);
      return { code: 404, msg: 'Error al obtener' };
    }
  }

  async getCategory(ids: number[]): Promise<ResponseDto> {
    try {
      if (!ids || ids.length === 0) {
        return { code: 400, msg: 'IDs no proporcionados correctamente' };
      }
      return {
        data: await this.categoryRepository.manager.find(Category, {
          relations: ['questions', 'questions.optionQuestions'],
          where: { id: In(ids), questions: { status: true } },
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al obtener' };
    }
  }
}
