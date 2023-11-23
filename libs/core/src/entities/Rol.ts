import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { RolPermissions } from './RolPermissions';
import { RolPrivileges } from './RolPrivileges';

@Index('rol_created_by_idx', ['createdBy'], {})
@Index('rol_pk', ['id'], { unique: true })
@Entity('rol', { schema: 'USR' })
export class Rol {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description?: string | null;

  @Column('boolean', { name: 'status', default: () => 'true' })
  status: boolean;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt?: Date | null;

  @Column('integer', { name: 'created_by', nullable: true })
  createdById?: number | null;

  @ManyToOne(() => User, (user) => user.rols, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy: User;

  @OneToMany(() => RolPermissions, (rolPermissions) => rolPermissions.rol)
  rolPermissions?: RolPermissions[];

  @OneToMany(() => RolPrivileges, (rolPrivileges) => rolPrivileges.rol)
  rolPrivileges: RolPrivileges[];

  @OneToMany(() => User, (user) => user.rol)
  users?: User[];
}
