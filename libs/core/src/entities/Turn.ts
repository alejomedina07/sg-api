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

// @Index('turn_created_by_idx', ['createdBy'], {})
@Index('turn_pk', ['id'], { unique: true })
@Entity('turn', { schema: 'CTM' })
export class Turn {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('character varying', { name: 'full_name', length: 200 })
  fullName: string;

  @Column('character varying', { name: 'company', nullable: true, length: 200 })
  company: string | null;

  @Column('character varying', { name: 'document', nullable: true, length: 20 })
  document: string | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt?: Date | null;

  @Column('timestamp without time zone', { name: 'finish_at', nullable: true })
  finishAt?: Date | null;

  @Column('integer', { name: 'total_time', nullable: true })
  totalTime?: number | null;

  @Column('integer', { name: 'created_by_id', nullable: true })
  createdById?: number | null;

  @Column('boolean', {
    name: 'is_finish',
    nullable: true,
    default: () => 'false',
  })
  isFinish?: boolean | null;

  @Column('character varying', {
    name: 'time_appointment',
    nullable: true,
    length: 10,
  })
  timeAppointment?: string;

  @OneToMany(() => Attention, (attention) => attention.turn)
  attentions?: Attention[];

  // @ManyToOne(() => User, (user) => user.turns, {
  //   onDelete: 'SET NULL',
  //   onUpdate: 'CASCADE',
  // })
  // @JoinColumn([{ name: 'createdBy', referencedColumnName: 'id' }]) // Cambiado a 'createdById'
  // createdBy?: User;
}
