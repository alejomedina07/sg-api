import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Permissions } from './Permissions';
import { Rol } from './Rol';

@Index('rol_permissions_pk', ['id'], { unique: true })
@Index('permissions_id_rol_permissions_idx', ['permissionsId'], {})
@Index('rol_id_rol_permissions_idx', ['rolId'], {})
@Entity('rol_permissions', { schema: 'USR' })
export class RolPermissions {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('integer', { name: 'rol_id', nullable: true })
  rolId: number | null;

  @Column('integer', { name: 'permissions_id', nullable: true })
  permissionsId: number | null;

  @ManyToOne(() => Permissions, (permissions) => permissions.rolPermissions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'permissions_id', referencedColumnName: 'id' }])
  permissions?: Permissions;

  @ManyToOne(() => Rol, (rol) => rol.rolPermissions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'rol_id', referencedColumnName: 'id' }])
  rol?: Rol;
}
