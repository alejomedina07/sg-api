import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Inventory } from "./Inventory";
import { User } from "./User";
import { Service } from "./Service";

@Index("inventory_in_out_inventory_id_idx", ["inventoryId"], {})
@Index("inventory_in_out_user_id_idx", ["createdBy"], {})
@Index("inventory_in_out_pk", ["id"], { unique: true })
@Index("inventory_in_out_service_id_idx", ["serviceId"], {})
@Entity("inventory_in_out", { schema: "INV" })
export class InventoryInOut {
  @PrimaryGeneratedColumn({ type: "integer", name: "id" })
  id?: number;

  @Column("integer", { name: "quantity" })
  quantity: number;

  @Column("integer", { name: "Inventory_id", nullable: true })
  inventoryId: number | null;

  @Column("integer", { name: "service_id", nullable: true })
  serviceId?: number | null;

  @Column("integer", { name: "created_by", nullable: true })
  createdById?: number | null;

  @Column("boolean", { name: "increment", nullable: true })
  increment: boolean | null;

  @ManyToOne(() => Inventory, (inventory) => inventory.inventoryInOuts, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "Inventory_id", referencedColumnName: "id" }])
  inventory?: Inventory;

  @ManyToOne(() => User, (user) => user.inventoryInOuts, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "created_by", referencedColumnName: "id" }])
  createdBy?: User;

  @ManyToOne(() => Service, (service) => service.inventoryInOuts, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn([{ name: "service_id", referencedColumnName: "id" }])
  service?: Service;
}
