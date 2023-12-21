import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AppointmentType } from './AppointmentType';
import { User } from './User';
import { Customer } from './Customer';
import { Service } from './Service';

@Index('appointment_appointment_type_id_idx', ['appointmentTypeId'], {})
@Index('appointment_user_id_idx', ['createdBy'], {})
@Index('appointment_id_customer_id_idx', ['customerId'], {})
@Index('appointment_pk', ['id'], { unique: true })
@Entity('appointment', { schema: 'APMT' })
export class Appointment {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('timestamp without time zone', { name: 'date' })
  date: Date;

  @Column('integer', { name: 'duration' })
  duration: number;

  @Column('integer', { name: 'customer_id', nullable: true })
  customerId?: number | null;

  @Column('text', { name: 'description', nullable: true })
  description?: string | null;

  @Column('integer', { name: 'created_by', nullable: true })
  createdById?: number | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt?: Date | null;

  @Column('text', { name: 'name' })
  name: string;

  @Column('integer', { name: 'appointment_type_id', nullable: true })
  appointmentTypeId?: number | null;

  @Column('integer', { name: 'assigned_to_id', nullable: true })
  assignedToId: number | null;

  @ManyToOne(
    () => AppointmentType,
    (appointmentType) => appointmentType.appointments,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'appointment_type_id', referencedColumnName: 'id' }])
  appointmentType?: AppointmentType;

  @ManyToOne(() => User, (user) => user.appointmentsAssigned, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'assigned_to_id', referencedColumnName: 'id' }])
  assignedTo?: User;

  @ManyToOne(() => User, (user) => user.appointments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy?: User;

  @ManyToOne(() => Customer, (customer) => customer.appointments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'customer_id', referencedColumnName: 'id' }])
  customer?: Customer;

  @OneToOne(() => Service, (service) => service.appointment)
  service?: Service;
}
