import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Procedure } from './Procedure';
import { Turn } from './Turn';

@Index('attention_attent_id_idx', ['attentBy'], {})
@Index('attention_pk', ['id'], { unique: true })
@Index('attention_procedure_id_idx', ['procedureId'], {})
@Index('attention_turn_id_idx', ['turnId'], {})
@Entity('attention', { schema: 'CTM' })
export class Attention {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('integer', { name: 'turn_id', nullable: true })
  turnId: number | null;

  @Column('integer', { name: 'attent_by', nullable: true })
  attentById: number | null;

  @Column('integer', { name: 'procedure_id', nullable: true })
  procedureId: number | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt?: Date | null;

  @ManyToOne(() => User, (user) => user.attentions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'attent_by', referencedColumnName: 'id' }])
  attentBy: User;

  @ManyToOne(() => Procedure, (procedure) => procedure.attentions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'procedure_id', referencedColumnName: 'id' }])
  procedure?: Procedure;

  @ManyToOne(() => Turn, (turn) => turn.attentions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'turn_id', referencedColumnName: 'id' }])
  turn?: Turn;
}
