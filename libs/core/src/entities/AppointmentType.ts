import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Appointment } from "./Appointment";

@Index("appointment_type_pk", ["id"], { unique: true })
@Entity("appointment_type", { schema: "APMT" })
export class AppointmentType {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id?: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description?: string | null;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt?: Date | null;

  @Column("boolean", { name: "status", nullable: true, default: () => "true" })
  status?: boolean | null;

  @Column("character varying", {
    name: "background",
    nullable: true,
    length: 10,
  })
  background?: string | null;

  @OneToMany(() => Appointment, (appointment) => appointment.appointmentType)
  appointments?: Appointment[];
}
