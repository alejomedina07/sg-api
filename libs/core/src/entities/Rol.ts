import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("rol_pk", ["id"], { unique: true })
@Entity("rol", { schema: "USR" })
export class Rol {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id?: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description?: string | null;

  @Column("boolean", { name: "status", default: () => "true" })
  status: boolean;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt?: Date | null;

  @OneToMany(() => User, (user) => user.rol)
  users?: User[];
}
