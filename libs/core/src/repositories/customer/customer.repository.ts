import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Appointment, Customer, Service } from 'sg/core/entities';
import { ResponseDto } from '../../../../../apps/main/src/dto/shared/response.dto';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(data: Customer): Promise<any> {
    try {
      console.log(78, data);
      const customerInsert = await this.customerRepository.manager.insert(
        Customer,
        data,
      );
      return {
        data: customerInsert.identifiers[0].id,
        msg: 'Cliente Creado exitosamente!',
        code: 200,
      };
      // return { data: 1, msg: 'Cliente Creado!', code: 200 }
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async updateCustomer(id: number, data: Customer): Promise<any> {
    try {
      console.log(78, data);
      const customerInsert = await this.customerRepository.update(id, data);
      return {
        data: customerInsert.raw,
        msg: 'Cliente Creado exitosamente!',
        code: 200,
      };
    } catch (e) {
      console.log(e);
      return { code: 500, msg: 'Error al intentar guardar' + e, data: e };
    }
  }

  async getCustomers(): Promise<ResponseDto> {
    try {
      return {
        data: await this.customerRepository.manager.find(Customer, {
          relations: ['status', 'documentType'],
          order: { name: 'ASC' },
        }),
        msg: 'Obtenido correctamente!',
        code: 201,
      };
    } catch (e) {
      console.log(e);
      return { code: 404, msg: 'Error al obtener ' + e, data: e };
    }
  }

  async getCustomerById(id: number): Promise<Customer | ResponseDto> {
    const customer = await this.customerRepository.manager.findOne(Customer, {
      where: { id: id },
    });
    const services = await this.customerRepository.manager.find(Service, {
      relations: ['status', 'type', 'createdBy'],
      where: { customerId: id },
      order: { id: 'DESC' },
    });
    const appointments = await this.customerRepository.manager.find(
      Appointment,
      {
        where: { customerId: id },
        order: { id: 'DESC' },
        relations: ['appointmentType', 'createdBy'],
      },
    );
    return { data: { customer, services, appointments }, msg: '', code: 201 };
    // return await this.customerRepository.manager.findOne( Customer, { relations:[ 'services', 'appointments'], where: { id: id }} );
  }
}
