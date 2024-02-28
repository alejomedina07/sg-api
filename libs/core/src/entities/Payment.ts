import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Expense } from './Expense';
import { PaymentAccountPayable } from './PaymentAccountPayable';

@Index('payment_created_by_id_idx', ['createdById'], {})
@Index('payment_uq', ['expenseId'], { unique: true })
@Index('payment_expense_id_idx', ['expenseId'], {})
@Index('payment_pk', ['id'], { unique: true })
@Entity('payment', { schema: 'PVD' })
export class Payment {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('money', { name: 'amount' })
  amount: string;

  @Column('text', { name: 'description', nullable: true })
  description?: string | null;

  @Column('timestamp without time zone', { name: 'payment_date' })
  paymentDate: Date;

  @Column('character varying', {
    name: 'reference',
    nullable: true,
    length: 100,
  })
  reference?: string | null;

  @Column('character varying', { name: 'method', length: 150 })
  method: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt?: Date | null;

  @Column('integer', { name: 'created_by_id', nullable: true })
  createdById?: number | null;

  @Column('integer', { name: 'expense_id', nullable: true, unique: true })
  expenseId?: number | null;

  @ManyToOne(() => User, (user) => user.payments, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'created_by_id', referencedColumnName: 'id' }])
  createdBy?: User;

  @OneToOne(() => Expense, (expense) => expense.payment, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'expense_id', referencedColumnName: 'id' }])
  expense?: Expense;

  @OneToMany(
    () => PaymentAccountPayable,
    (paymentAccountPayable) => paymentAccountPayable.payment,
  )
  paymentAccountPayables?: PaymentAccountPayable[];
}
