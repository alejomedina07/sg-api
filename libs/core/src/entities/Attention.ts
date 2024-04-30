import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Turn } from './Turn';
import { TypeTurn } from './TypeTurn';

// @Index('attention_attent_id_idx', ['attentBy'], {})
@Index('attention_pk', ['id'], { unique: true })
@Index('attention_turn_id_idx', ['turnId'], {})
@Entity('attention', { schema: 'CTM' })
export class Attention {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('integer', { name: 'turn_id', nullable: true })
  turnId: number | null;

  @Column('integer', { name: 'attent_by_id', nullable: true })
  attentById: number | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt?: Date | null;

  @Column('integer', { name: 'type_turn_id', nullable: true })
  typeTurnId: number | null;

  @Column('timestamp without time zone', { name: 'finish_at', nullable: true })
  finishAt?: Date | null;

  @Column('integer', { name: 'total_time', nullable: true })
  totalTime?: number | null;

  @Column('text', { name: 'description', nullable: true })
  description?: string | null;

  @ManyToOne(() => User, (user) => user.attentions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'attent_by_id', referencedColumnName: 'id' }])
  attentBy?: User;

  @ManyToOne(() => Turn, (turn) => turn.attentions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'turn_id', referencedColumnName: 'id' }])
  turn?: Turn;

  @ManyToOne(() => TypeTurn, (typeTurn) => typeTurn.attentions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'type_turn_id', referencedColumnName: 'id' }])
  typeTurn?: TypeTurn;
}
