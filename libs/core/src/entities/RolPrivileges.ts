import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Privileges } from './Privileges';
import { Rol } from './Rol';

@Index('rol_privileges_pk', ['id'], { unique: true })
@Index('rol_privileges_privileges_id_idx', ['privilegesId'], {})
@Index('rol_privileges_rol_id_idx', ['rolId'], {})
@Entity('rol_privileges', { schema: 'USR' })
export class RolPrivileges {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('integer', { name: 'rol_id', nullable: true })
  rolId: number | null;

  @Column('integer', { name: 'privileges_id', nullable: true })
  privilegesId: number | null;

  @ManyToOne(() => Privileges, (privileges) => privileges.rolPrivileges, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'privileges_id', referencedColumnName: 'id' }])
  privileges?: Privileges;

  @ManyToOne(() => Rol, (rol) => rol.rolPrivileges, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'rol_id', referencedColumnName: 'id' }])
  rol?: Rol;
}
