import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';
import { Provider } from './Provider';
import { PaymentAccountPayable } from './PaymentAccountPayable';

@Index('account_payable_created_by_id_idx', ['createdById'], {})
@Index('account_payable_pk', ['id'], { unique: true })
@Index('account_payable_provider_id_idx', ['providerId'], {})
@Entity('account_payable', { schema: 'PVD' })
export class AccountPayable {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('text', { name: 'description', nullable: true })
  description?: string | null;

  @Column('boolean', { name: 'paid', nullable: true, default: () => 'false' })
  paid?: boolean | null;

  @Column('timestamp without time zone', { name: 'max_date_of_pay' })
  maxDateOfPay: Date;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt?: Date | null;

  @Column('integer', { name: 'created_by_id', nullable: true })
  createdById?: number | null;

  @Column('integer', { name: 'provider_id', nullable: true })
  providerId: number | null;

  @Column('character varying', {
    name: 'reference',
    nullable: true,
    length: 100,
  })
  reference?: string | null;

  @Column('money', { name: 'amount' })
  amount: string;

  @Column('money', { name: 'amount_paid', nullable: true, default: () => '0' })
  amountPaid?: string | null;

  @ManyToOne(() => User, (user) => user.accountPayables, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'created_by_id', referencedColumnName: 'id' }])
  createdBy?: User;

  @ManyToOne(() => Provider, (provider) => provider.accountPayables, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'provider_id', referencedColumnName: 'id' }])
  provider?: Provider;

  @OneToMany(
    () => PaymentAccountPayable,
    (paymentAccountPayable) => paymentAccountPayable.accountPayable,
  )
  paymentAccountPayables?: PaymentAccountPayable[];
}
