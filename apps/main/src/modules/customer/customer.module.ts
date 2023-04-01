import { Module } from '@nestjs/common';
import { CustomerService } from "../../services/customer/customer.service";
import { CustomerRepository } from "sg/core/repositories/customer/customer.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Customer } from "sg/core/entities";
import { CustomerController } from "../../controllers/customer/customer.controller";

@Module({
  imports:[
    TypeOrmModule.forFeature([Customer]),
  ],
  controllers:[CustomerController],
  providers:[CustomerService, CustomerRepository]
})
export class CustomerModule {}
