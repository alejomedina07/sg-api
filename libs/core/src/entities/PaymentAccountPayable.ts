import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AccountPayable } from './AccountPayable';
import { Payment } from './Payment';

@Index(
  'payment_account_payable_account_payable_id_idx',
  ['accountPayableId'],
  {},
)
@Index('payment_account_payable_pk', ['id'], { unique: true })
@Index('payment_account_payable_payment_id_idx', ['paymentId'], {})
@Entity('payment_account_payable', { schema: 'PVD' })
export class PaymentAccountPayable {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('money', { name: 'amount' })
  amount: string;

  @Column('integer', { name: 'account_payable_id', nullable: true })
  accountPayableId: number | null;

  @Column('integer', { name: 'payment_id', nullable: true })
  paymentId: number | null;

  @ManyToOne(
    () => AccountPayable,
    (accountPayable) => accountPayable.paymentAccountPayables,
    { onDelete: 'SET NULL', onUpdate: 'CASCADE' },
  )
  @JoinColumn([{ name: 'account_payable_id', referencedColumnName: 'id' }])
  accountPayable?: AccountPayable;

  @ManyToOne(() => Payment, (payment) => payment.paymentAccountPayables, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'payment_id', referencedColumnName: 'id' }])
  payment?: Payment;
}
