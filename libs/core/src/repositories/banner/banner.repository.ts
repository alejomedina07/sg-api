import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Attention, Banner } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';
import * as fs from 'fs';

@Injectable()
export class BannerRepository {
  constructor(
    @InjectRepository(Banner)
    private bannerRepository: Repository<Banner>,
    private readonly entityManager: EntityManager,
  ) {}

  async createBanner(data: Banner): Promise<any> {
    try {
      return this.entityManager.transaction(async (entityManager) => {
        const bannerInsert = await entityManager.insert(Banner, data);
        if (data.photo) {
          const photo = `banner-${bannerInsert.identifiers[0].id}-${data.photo}`;
          fs.copyFileSync(`./uploads/${data.photo}`, `./banners/${photo}`);
          await entityManager.update(Banner, bannerInsert.identifiers[0].id, {
            photo,
          });
          fs.unlinkSync(`./uploads/${data.photo}`);
        }

        return {
          data: bannerInsert.identifiers[0].id,
          success: true,
          msg: 'Turno Creado!',
          code: 200,
        };
      });

      // const categoryInsert = await this.bannerRepository.manager.insert(
      //   Banner,
      //   data,
      // );
      // return {
      //   data: categoryInsert.identifiers[0].id,
      //   msg: 'Banner creado exitosamente!',
      //   code: 200,
      // };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async updateBanner(id: number, data: Banner): Promise<any> {
    try {
      const categoryInsert = await this.bannerRepository.update(id, data);
      return {
        data: categoryInsert.raw,
        msg: 'Banner creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      return { code: 500, msg: 'Error al intentar guardar' };
    }
  }

  async getBanners(list: boolean): Promise<ResponseDto> {
    try {
      return {
        data: list
          ? await this.bannerRepository.manager.find(Banner, {
              where: { status: true },
              order: { id: 'desc' },
            })
          : await this.bannerRepository.manager.find(Banner, {
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
}
