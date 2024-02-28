import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountPayable } from './AccountPayable';
import { User } from './User';
import { List } from './List';

@Index('provider_created_by_id_idx', ['createdById'], {})
@Index('provider_document_type_id_idx', ['documentTypeId'], {})
@Index('email_unique', ['email'], { unique: true })
@Index('provider_pk', ['id'], { unique: true })
@Entity('provider', { schema: 'PVD' })
export class Provider {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('character varying', { name: 'phone_number', length: 20 })
  phoneNumber: string;

  @Column('character varying', { name: 'address', nullable: true, length: 100 })
  address?: string | null;

  @Column('character varying', { name: 'email', nullable: true, length: 150 })
  email: string | null;

  @Column('character varying', { name: 'document', length: 30 })
  document: string;

  @Column('boolean', { name: 'status', nullable: true, default: () => 'true' })
  status: boolean | null;

  @Column('text', { name: 'description', nullable: true })
  description?: string | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt?: Date | null;

  @Column('integer', { name: 'document_type_id', nullable: true })
  documentTypeId: number | null;

  @Column('integer', { name: 'created_by_id', nullable: true })
  createdById?: number | null;

  @Column('money', { name: 'amount_debt', nullable: true })
  amountDebt?: string | null;

  @OneToMany(() => AccountPayable, (accountPayable) => accountPayable.provider)
  accountPayables?: AccountPayable[];

  @ManyToOne(() => User, (user) => user.providers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'created_by_id', referencedColumnName: 'id' }])
  createdBy?: User;

  @ManyToOne(() => List, (list) => list.providers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'document_type_id', referencedColumnName: 'id' }])
  documentType?: List;
}
