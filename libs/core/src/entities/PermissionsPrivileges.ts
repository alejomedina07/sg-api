import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permissions } from './Permissions';
import { Privileges } from './Privileges';

@Index('permissions_privileges_pk', ['id'], { unique: true })
@Index('permissions_privileges_permissions_id_idx', ['permissionsId'], {})
@Index('permissions_privileges_privileges_id_idx', ['privilegesId'], {})
@Entity('permissions_privileges', { schema: 'USR' })
export class PermissionsPrivileges {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('integer', { name: 'permissions_id', nullable: true })
  permissionsId: number | null;

  @Column('integer', { name: 'privileges_id', nullable: true })
  privilegesId: number | null;

  @ManyToOne(
    () => Permissions,
    (permissions) => permissions.permissionsPrivileges,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'permissions_id', referencedColumnName: 'id' }])
  permissions?: Permissions;

  @ManyToOne(
    () => Privileges,
    (privileges) => privileges.permissionsPrivileges,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'privileges_id', referencedColumnName: 'id' }])
  privileges?: Privileges;
}
