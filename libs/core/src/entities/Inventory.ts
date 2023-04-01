import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
}                         from "typeorm";
import { User }           from "./User";
import { InventoryInOut } from "./InventoryInOut";
import { List }           from 'sg/core/entities/List';

@Index("Inventory_pk", ["id"], { unique: true })
@Entity("Inventory", { schema: "INV" })
export class Inventory {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id?: number;

  @Column("text", { name: "name" })
  name: string;

  @Column("text", { name: "description", nullable: true })
  description: string | null;

  @Column("integer", { name: "quantity" })
  quantity: number;

  @Column("timestamp without time zone", {
    name: "created_at",
    nullable: true,
    default: () => "now()",
  })
  createdAt?: Date | null;

  @Column("integer", { name: "created_by", nullable: true })
  createdById?: number | null;

  @Column("integer", { name: "status_id", nullable: true })
  statusId: number | null;

  @ManyToOne(() => List, (list) => list.inventories, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "status_id", referencedColumnName: "id" }])
  status?: List;

  @ManyToOne(() => User, (user) => user.inventories, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy?: User;

  @OneToMany(() => InventoryInOut, (inventoryInOut) => inventoryInOut.inventory)
  inventoryInOuts?: InventoryInOut[];
}
