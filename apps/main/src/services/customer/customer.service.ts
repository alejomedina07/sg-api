import { Injectable }         from '@nestjs/common';
import { CustomerRepository } from "sg/core/repositories/customer/customer.repository";
import { ResponseDto }        from "../../dto/shared/response.dto";
import { CreateCustomerDto }  from "../../dto/customer/createCustomer.dto";
import { Customer }           from 'sg/core/entities';

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {
  }

  async getCustomer(): Promise<ResponseDto> {
    return await this.customerRepository.getCustomers()
  }

  async getCustomerById(id: number): Promise<Customer | ResponseDto> {
    return await this.customerRepository.getCustomerById(id)
  }

  async createCustomer(data: CreateCustomerDto): Promise<ResponseDto> {
    return await this.customerRepository.createCustomer(data);
  }

  async updateCustomer(id: number, data: CreateCustomerDto): Promise<ResponseDto> {
    return await this.customerRepository.updateCustomer(id, data);
  }

}
