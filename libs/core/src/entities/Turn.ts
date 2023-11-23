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
import { Procedure } from './Procedure';

@Index('turn_created_by_idx', ['createdBy'], {})
@Index('turn_pk', ['id'], { unique: true })
@Index('turn_procedure_id_idx', ['procedureId'], {})
@Entity('turn', { schema: 'CTM' })
export class Turn {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('integer', { name: 'created_by', nullable: true })
  createdById: number | null;

  @Column('integer', { name: 'procedure_id', nullable: true })
  procedureId: number | null;

  @Column('character varying', { name: 'full_name', length: 50 })
  fullName: string;

  @OneToMany(() => Attention, (attention) => attention.turn)
  attentions?: Attention[];

  @ManyToOne(() => User, (user) => user.turns, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy?: User;

  @ManyToOne(() => Procedure, (procedure) => procedure.turns, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'procedure_id', referencedColumnName: 'id' }])
  procedure?: Procedure;
}
