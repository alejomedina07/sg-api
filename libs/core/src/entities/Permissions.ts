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
import { PermissionsPrivileges } from './PermissionsPrivileges';
import { RolPermissions } from './RolPermissions';

@Index('permissions_created_by_idx', ['createdBy'], {})
@Index('permissions_pk', ['id'], { unique: true })
@Entity('permissions', { schema: 'USR' })
export class Permissions {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @Column('integer', { name: 'created_by', nullable: true })
  createdById: number | null;

  @ManyToOne(() => User, (user) => user.permissions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy?: User;

  @OneToMany(
    () => PermissionsPrivileges,
    (permissionsPrivileges) => permissionsPrivileges.permissions,
  )
  permissionsPrivileges?: PermissionsPrivileges[];

  @OneToMany(
    () => RolPermissions,
    (rolPermissions) => rolPermissions.permissions,
  )
  rolPermissions?: RolPermissions[];
}
