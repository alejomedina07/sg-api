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
import { Turn } from './Turn';
import { User } from './User';

@Index('procedure_created_by_idx', ['createdBy'], {})
@Index('procedure_pk', ['id'], { unique: true })
@Entity('type_turn', { schema: 'CTM' })
export class TypeTurn {
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
  createdAt?: Date | null;

  @Column('boolean', { name: 'status' })
  status: boolean;

  @Column('integer', { name: 'created_by', nullable: true })
  createdById?: number | null;

  @OneToMany(() => Attention, (attention) => attention.typeTurn)
  attentions?: Attention[];

  @ManyToOne(() => User, (user) => user.typeTurns, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy?: User;
}
