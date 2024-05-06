import { Injectable } from '@nestjs/common';
import { TypeFiltersDto } from '../../../../../apps/main/src/modules/provider/dto/typeFilters.dto';
import {
  Equal,
  FindManyOptions,
  FindOperator,
  ILike,
  MoreThanOrEqual,
  Between,
} from 'typeorm';
import { Payment } from 'sg/core/entities';

@Injectable()
export class FilterListService {
  // getFiltersList(
  //   filters: object,
  //   TYPES_FILTERS: TypeFiltersDto,
  // ): [
  //   whereConditions: Array<{
  //     [key: string]:
  //       | FindOperator<any>
  //       | { [key: string]: FindOperator<any> | any };
  //   }>,
  //   whereWithAnd: {},
  // ] {
  //   const whereConditions: Array<{
  //     [key: string]:
  //       | FindOperator<any>
  //       | { [key: string]: FindOperator<any> | any };
  //   }> = [];
  //   let whereWithAnd = {};
  //   for (let key in filters) {
  //     if (filters.hasOwnProperty(key)) {
  //       if (TYPES_FILTERS.CONTAINS[key]) {
  //         whereConditions.push({ [key]: ILike(`%${filters[key]}%`) });
  //         whereWithAnd[key] = ILike(`%${filters[key]}%`);
  //       } else if (TYPES_FILTERS.NUMBERS[key]) {
  //         whereConditions.push({
  //           [key]: MoreThanOrEqual(parseInt(filters[key])),
  //         });
  //         whereWithAnd[key] = MoreThanOrEqual(parseInt(filters[key]));
  //       } else if (TYPES_FILTERS.BOOLEAN[key]) {
  //         whereConditions.push({ [key]: Equal(filters[key] === 'true') });
  //         whereWithAnd[key] = Equal(filters[key] === 'true');
  //       } else if (TYPES_FILTERS.RELATION[key]) {
  //         whereWithAnd[key] = {
  //           [TYPES_FILTERS.RELATION[key]]: ILike(`%${filters[key]}%`),
  //         };
  //         whereConditions.push({
  //           [key]: {
  //             [TYPES_FILTERS.RELATION[key]]: ILike(`%${filters[key]}%`),
  //           },
  //         });
  //       }
  //     }
  //   }
  //
  //   return [whereConditions, whereWithAnd];
  // }

  getQueryFilters(
    filters: any,
    TYPES_FILTERS: TypeFiltersDto,
    queryOptions: FindManyOptions<any>,
  ): FindManyOptions<any> {
    const whereConditions: Array<{
      [key: string]:
        | FindOperator<any>
        | { [key: string]: FindOperator<any> | any };
    }> = [];
    let whereWithAnd = {};
    for (let key in filters) {
      if (filters.hasOwnProperty(key)) {
        if (TYPES_FILTERS.CONTAINS && TYPES_FILTERS.CONTAINS[key]) {
          whereConditions.push({ [key]: ILike(`%${filters[key]}%`) });
          whereWithAnd[key] = ILike(`%${filters[key]}%`);
        } else if (TYPES_FILTERS.NUMBERS && TYPES_FILTERS.NUMBERS[key]) {
          whereConditions.push({
            [key]: MoreThanOrEqual(parseInt(filters[key])),
          });
          whereWithAnd[key] = parseInt(filters[key]);
        } else if (TYPES_FILTERS.BOOLEAN && TYPES_FILTERS.BOOLEAN[key]) {
          whereConditions.push({ [key]: Equal(filters[key] === 'true') });
          whereWithAnd[key] = Equal(filters[key] === 'true');
        } else if (TYPES_FILTERS.RELATION && TYPES_FILTERS.RELATION[key]) {
          whereWithAnd[key] = {
            [TYPES_FILTERS.RELATION[key]]: ILike(`%${filters[key]}%`),
          };
          whereConditions.push({
            [key]: {
              [TYPES_FILTERS.RELATION[key]]: ILike(`%${filters[key]}%`),
            },
          });
        } else if (TYPES_FILTERS.EQUAL && TYPES_FILTERS.EQUAL[key]) {
          whereConditions.push({ [key]: Equal(filters[key]) });
          whereWithAnd[key] = Equal(filters[key]);
        } else if (TYPES_FILTERS.DATE && TYPES_FILTERS.DATE[key]) {
          // Si el filtro es para una fecha
          const dateFilter = new Date(filters[key]);
          const nextDay = new Date(dateFilter);
          nextDay.setDate(nextDay.getDate() + 1);
          whereConditions.push({
            [key]: Between(dateFilter, nextDay),
          });
          whereWithAnd[key] = {
            Between: [dateFilter, nextDay],
          };
        }
      }
    }
    if (filters) {
      if (filters.type === 'AND') {
        queryOptions.where =
          Object.keys(whereWithAnd).length > 0 ? whereWithAnd : undefined;
      } else {
        queryOptions.where =
          whereConditions.length > 0 ? whereConditions : undefined;
      }
      console.log(1234, queryOptions.where);
    }

    return queryOptions;
  }
}
