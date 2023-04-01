import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";

@Index("expense_user_id_idx", ["createdBy"], {})
@Index("expense_pk", ["id"], { unique: true })
@Entity("expense", { schema: "INV" })
export class Expense {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id?: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("integer", { name: "amount" })
  amount: number;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt?: Date | null;

  @Column("integer", { name: "created_by", nullable: true })
  createdById?: number | null;

  @ManyToOne(() => User, (user) => user.expenses, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy?: User;
}
