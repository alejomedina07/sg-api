import { Injectable } from '@nestjs/common';
import { CustomerRepository } from "sg/core/repositories/customer/customer.repository";
import { ResponseDto } from "../../dto/shared/response.dto";
import { CreateCustomerDto } from "../../dto/customer/createCustomer.dto";

@Injectable()
export class CustomerService {
  constructor(private customerRepository: CustomerRepository) {
  }

  async getCustomer(): Promise<ResponseDto> {
    return await this.customerRepository.getCustomers()
  }

  async createCustomer(data: CreateCustomerDto): Promise<ResponseDto> {
    return await this.customerRepository.createCustomer(data);
  }

}
