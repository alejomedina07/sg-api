import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Index('note_user_id_idx', ['createdBy'], {})
@Index('note_pk', ['id'], { unique: true })
@Entity('note', { schema: 'CNFG' })
export class Note {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('text', { name: 'title' })
  title: string;

  @Column('text', { name: 'description' })
  description: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt?: Date | null;

  @Column('integer', { name: 'created_by', nullable: true })
  createdById?: number | null;

  @Column('text', { name: 'entity_type' })
  entityType: string;

  @Column('integer', { name: 'entity_id' })
  entityId: number;

  @ManyToOne(() => User, (user) => user.notes, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy?: User;
}
