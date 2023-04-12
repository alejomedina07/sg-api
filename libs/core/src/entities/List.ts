import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Inventory } from "./Inventory";
import { Customer } from "./Customer";
import { Expense } from "./Expense";
import { Service } from "./Service";
import { User } from "./User";

@Index("List_pk", ["id"], { unique: true })
@Entity("list", { schema: "CNFG" })
export class List {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id?: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "key" })
  key: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt?: Date | null;

  @Column("timestamp without time zone", { name: "updated_at", nullable: true })
  updatedAt?: Date | null;

  @Column("boolean", { name: "status", nullable: true, default: () => "true" })
  status: boolean | null;

  @Column("boolean", { name: "default", nullable: true })
  default?: boolean | null;

  @OneToMany(() => Customer, (customer) => customer.documentType)
  customersDocumentType?: Customer[];

  @OneToMany(() => Customer, (customer) => customer.status)
  customersStatus?: Customer[];

  @OneToMany(() => Expense, (expense) => expense.type)
  expenses?: Expense[];

  @OneToMany(() => Service, (service) => service.status)
  services?: Service[];

  @OneToMany(() => Service, (service) => service.type)
  servicesType: Service[];

  @OneToMany(() => User, (user) => user.documentType)
  usersDocumentType?: User[];

  @OneToMany(() => User, (user) => user.status)
  usersStatus?: User[];


  @OneToMany(() => Inventory, (inventory) => inventory.status)
  inventories?: Inventory[];

}
