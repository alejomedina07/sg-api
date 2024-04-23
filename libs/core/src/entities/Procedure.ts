import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Attention } from './Attention';
import { User } from './User';
import { ProcedureProcedure } from './ProcedureProcedure';
import { Turn } from './Turn';

@Index('procedure_created_by_idx', ['createdBy'], {})
@Index('procedure_pk', ['id'], { unique: true })
@Entity('procedure', { schema: 'SVC' })
export class Procedure {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('character varying', { name: 'name', length: 50 })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description?: string | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt?: Date | null;

  @Column('boolean', { name: 'status' })
  status: boolean;

  @Column('integer', { name: 'created_by', nullable: true })
  createdById?: number | null;

  @Column('boolean', { name: 'parent', nullable: true })
  parent: boolean | null;

  // @OneToMany(() => Attention, (attention) => attention.procedure)
  // attentions?: Attention[];
  //
  // @ManyToOne(() => User, (user) => user.procedures, {
  //   onDelete: 'SET NULL',
  //   onUpdate: 'CASCADE',
  // })
  // @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  // createdBy?: User;

  @OneToMany(
    () => ProcedureProcedure,
    (procedureProcedure) => procedureProcedure.procedureIdChildrenId,
  )
  procedureProceduresChildren?: ProcedureProcedure[];

  @OneToMany(
    () => ProcedureProcedure,
    (procedureProcedure) => procedureProcedure.procedureIdParentId,
  )
  procedureProceduresParent?: ProcedureProcedure[];
  //
  // @OneToMany(() => Turn, (turn) => turn.procedure)
  // turns?: Turn[];
}
