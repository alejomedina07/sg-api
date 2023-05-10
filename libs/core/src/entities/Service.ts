import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { InventoryInOut } from "./InventoryInOut";
import { Appointment } from "./Appointment";
import { User } from "./User";
import { Customer } from "./Customer";
import { List } from "./List";

@Index("service_id_appointment_id_idx", ["appointmentId"], {})
@Index("service_uq", ["appointmentId"], { unique: true })
@Index("service_user_id_idx", ["createdBy"], {})
@Index("service_id_customer_id_idx", ["customerId"], {})
@Index("service_pk", ["id"], { unique: true })
@Index("service_list_id_idx", ["statusId"], {})
@Index("service_type_id_idx", ["typeId"], {})
@Entity("service", { schema: "SVC" })
export class Service {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id?: number;

  @Column("timestamp without time zone", {
    name: "created_at",
    default: () => "now()",
  })
  createdAt?: Date;

  @Column("money", { name: "amount" })
  amount: string;

  @Column("integer", { name: "appointment_id", nullable: true, unique: true })
  appointmentId?: number | null;

  @Column("integer", { name: "customer_id", nullable: true })
  customerId?: number | null;

  @Column("text", { name: "description" })
  description: string;

  @Column("integer", { name: "created_by", nullable: true })
  createdById?: number | null;

  @Column("integer", { name: "status_id", nullable: true })
  statusId?: number | null;

  @Column("integer", { name: "type_id", nullable: true })
  typeId: number | null;

  @OneToMany(() => InventoryInOut, (inventoryInOut) => inventoryInOut.service)
  inventoryInOuts?: InventoryInOut[];

  @OneToOne(() => Appointment, (appointment) => appointment.service, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "appointment_id", referencedColumnName: "id" }])
  appointment?: Appointment;

  @ManyToOne(() => User, (user) => user.services, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy?: User;

  @ManyToOne(() => Customer, (customer) => customer.services, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "customer_id", referencedColumnName: "id" }])
  customer?: Customer;

  @ManyToOne(() => List, (list) => list.services, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "status_id", referencedColumnName: "id" }])
  status?: List;

  @ManyToOne(() => List, (list) => list.servicesType, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "type_id", referencedColumnName: "id" }])
  type?: List;
}
