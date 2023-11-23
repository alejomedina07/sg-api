import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PermissionsPrivileges } from './PermissionsPrivileges';
import { User } from './User';
import { RolPrivileges } from './RolPrivileges';

@Index('privileges_created_by_idx', ['createdBy'], {})
@Index('privileges_pk', ['id'], { unique: true })
@Entity('privileges', { schema: 'USR' })
export class Privileges {
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

  @OneToMany(
    () => PermissionsPrivileges,
    (permissionsPrivileges) => permissionsPrivileges.privileges,
  )
  permissionsPrivileges?: PermissionsPrivileges[];

  @ManyToOne(() => User, (user) => user.privileges, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy?: User;

  @OneToMany(() => RolPrivileges, (rolPrivileges) => rolPrivileges.privileges)
  rolPrivileges?: RolPrivileges[];
}
