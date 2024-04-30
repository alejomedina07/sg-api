import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'sg/core/entities';
import { Repository } from 'typeorm';
import { GetReportDto } from '../../../../../apps/main/src/shared/dto/getReport.dto';
import { ResponseDto } from '../../../../../apps/main/src/shared/dto/response.dto';

@Injectable()
export class ReportRepository {
  constructor(
    @InjectRepository(Service) private serviceRepository: Repository<Service>,
  ) {}

  async getReportMain(params: GetReportDto): Promise<ResponseDto> {
    try {
      const { startDate, endDate } = params;

      // const queryDona = `
      //     select SUM(s.amount) AS totalAmount, s.type_id, l.name
      //     from "SVC".service as s
      //     inner join "CNFG".list as l on s.type_id = l.id
      //     WHERE s.created_at >= '2023-05-01' AND s.created_at <= '2023-07-05'
      //     group by s.type_id, l.name;`

      const queryService = `
          SELECT
              TO_CHAR(date_trunc('day', created_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/Bogota'), 'YYYY-MM-DD') AS name,
              CAST(COUNT(*) AS INTEGER) AS count,
              SUM(amount) AS total_amount
          FROM "SVC".service
          WHERE created_at >= '${startDate}' AND created_at <= '${endDate}'
          group by name
          ORDER BY name desc `;

      const queryExpense = `
          SELECT
              TO_CHAR(date_trunc('day', created_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/Bogota'), 'YYYY-MM-DD') AS name,
              CAST(COUNT(*) AS INTEGER) AS count,
              SUM(amount) AS total_amount
          FROM "INV".expense
          WHERE created_at >= '${startDate}' AND created_at <= '${endDate}'
          GROUP BY date_trunc('day', created_at AT TIME ZONE 'UTC' AT TIME ZONE 'America/Bogota')
          ORDER BY name desc `;

      const resultService = await this.serviceRepository.query(queryService);
      const resultExpense = await this.serviceRepository.query(queryExpense);
      console.log(78, resultExpense);
      const dataExpense = resultExpense.map(
        ({ name, total_amount, count }) => ({
          name,
          count,
          totalAmount:
            parseInt(String(total_amount.replace(/[$,]/g, '') * 100)) / 100,
        }),
      );
      console.log(dataExpense);
      const dataService = resultService.map(
        ({ name, total_amount, count }) => ({
          name,
          count,
          totalAmount:
            parseInt(String(total_amount.replace(/[$,]/g, '') * 100)) / 100,
        }),
      );
      const data = { dataService, dataExpense };
      console.log(data);
      return { data, code: 201, msg: 'Obtenido correctamente' };
    } catch (e) {
      console.log(e);
      return { data: e, code: 500, msg: 'Error al obtener' };
    }
  }

  async getReportProducts(params: GetReportDto): Promise<ResponseDto> {
    try {
      const { startDate, endDate } = params;
      const queryService = `
        select
            io."Inventory_id" as id,
            I.name as product,
            CAST(SUM( case when io.increment then io.quantity end ) AS INTEGER ) as increment,
            CAST(SUM( case when io.increment = false then io.quantity end ) AS INTEGER ) as decrement
        from "INV".inventory_in_out as io
        inner join "INV"."Inventory" I on I.id = io."Inventory_id"
        where io.created_at >= '${startDate}' AND io.created_at <= '${endDate}'
        group by "Inventory_id", I.name
      `;
      return {
        data: await this.serviceRepository.query(queryService),
        code: 201,
        msg: 'Obtenido correctamente',
      };
    } catch (e) {
      console.log(e);
      return { data: e, code: 500, msg: 'Error al obtener' };
    }
  }

  async getReportTurn(params: GetReportDto): Promise<ResponseDto> {
    try {
      const { startDate, endDate } = params;
      const queryTurn = `
          SELECT
              t.created_by_id,
              u.first_name || ' ' || u.last_name AS name,
              CAST(COUNT(*) AS INTEGER) AS count
          FROM "CTM".turn AS t
          INNER JOIN "USR"."user" AS u ON u.id = t.created_by_id
          WHERE t.created_at >= '${startDate}' AND t.created_at <= '${endDate}'
          GROUP BY t.created_by_id, u.first_name, u.last_name
      `;
      const queryAttention = `
          SELECT at.attent_by_id,
                 u.first_name || ' ' || u.last_name AS name,
                 SUM(at.total_time) AS total_minutes,
                 AVG(at.total_time) AS average,
                 COUNT(*) AS count
          FROM "CTM".attention at
          INNER JOIN "USR"."user" AS u ON u.id = at.attent_by_id
          WHERE at.created_at >= '${startDate}' AND at.created_at <= '${endDate}'
          GROUP BY at.attent_by_id, u.first_name, u.last_name;
      `;
      return {
        data: {
          turns: await this.serviceRepository.query(queryTurn),
          attentions: await this.serviceRepository.query(queryAttention),
        },
        code: 201,
        msg: 'Obtenido correctamente',
      };
    } catch (e) {
      console.log(e);
      return { data: e, code: 500, msg: 'Error al obtener' };
    }
  }

  async getReportDashboard(params: GetReportDto): Promise<ResponseDto> {
    try {
      const { startDate, endDate } = params;
      const queryService = `
          select SUM(s.amount) AS amount, s.type_id, l.name
          from "SVC".service as s
                   inner join "CNFG".list as l on s.type_id = l.id
          WHERE s.created_at >= '${startDate}' AND s.created_at <= '${endDate}'
          group by s.type_id, l.name`;

      const queryExpense = `select SUM(e.amount) AS amount, e.type_id, l.name
            from "INV".expense as e
                     inner join "CNFG".list as l on e.type_id = l.id
            WHERE e.created_at >= '${startDate}' AND e.created_at <= '${endDate}'
            group by e.type_id, l.name`;

      return {
        data: {
          service: await this.serviceRepository.query(queryService),
          expense: await this.serviceRepository.query(queryExpense),
        },
        code: 201,
        msg: 'Obtenido correctamente',
      };
    } catch (e) {
      console.log(e);
      return { data: e, code: 500, msg: 'Error al obtener' };
    }
  }
}
