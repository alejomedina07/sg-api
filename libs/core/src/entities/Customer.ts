import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Appointment } from './Appointment';
import { User } from './User';
import { List } from './List';
import { Service } from './Service';

@Index('customer_user_id_idx', ['createdBy'], {})
@Index('customer_pk', ['id'], { unique: true })
@Entity('customer', { schema: 'CTM' })
export class Customer {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'document', nullable: true })
  document?: string | null;

  @Column('text', { name: 'address', nullable: true })
  address?: string | null;

  @Column('text', { name: 'phone_number' })
  phoneNumber: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt?: Date | null;

  @Column('character varying', {
    name: 'blood_type',
    nullable: true,
    length: 10,
  })
  bloodType?: string | null;

  @Column('integer', { name: 'status_id', nullable: true })
  statusId?: number | null;

  @Column('integer', { name: 'document_type_id', nullable: true })
  documentTypeId?: number | null;

  @Column('integer', { name: 'created_by', nullable: true })
  createdById?: number | null;

  @Column('timestamp without time zone', { name: 'birth_date', nullable: true })
  birthDate?: Date | null;

  @Column('text', { name: 'description', nullable: true })
  description?: string | null;

  @OneToMany(() => Appointment, (appointment) => appointment.customer)
  appointments?: Appointment[];

  @ManyToOne(() => User, (user) => user.customers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy?: User;

  @ManyToOne(() => List, (list) => list.customersDocumentType, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'document_type_id', referencedColumnName: 'id' }])
  documentType?: List;

  @ManyToOne(() => List, (list) => list.customersStatus, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'status_id', referencedColumnName: 'id' }])
  status?: List;

  @OneToMany(() => Service, (service) => service.customer)
  services?: Service[];
}
