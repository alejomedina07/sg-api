import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Inventory } from './Inventory';
import { AccountPayable } from './AccountPayable';
import { Appointment } from './Appointment';
import { Attention } from './Attention';
import { Customer } from './Customer';
import { Expense } from './Expense';
import { InventoryInOut } from './InventoryInOut';
import { Note } from './Note';
import { Payment } from './Payment';
import { Permissions } from './Permissions';
import { Privileges } from './Privileges';
import { Provider } from './Provider';
import { Rol } from './Rol';
import { Service } from './Service';
import { Survey } from './Survey';
import { SurveyAnswer } from './SurveyAnswer';
import { Turn } from './Turn';
import { TypeTurn } from './TypeTurn';
import { List } from './List';

@Index('document_number_unique', ['documentNumber'], { unique: true })
@Index('user_document_type_id_idx', ['documentTypeId'], {})
@Index('email_unique', ['email'], { unique: true })
@Index('user_pk', ['id'], { unique: true })
@Index('phone_unique', ['phoneNumber'], { unique: true })
@Index('user_rol_id_idx', ['rolId'], {})
@Index('user_status_id_idx', ['statusId'], {})
@Entity('user', { schema: 'USR' })
export class User {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('text', { name: 'first_name' })
  firstName: string;

  @Column('text', { name: 'last_name' })
  lastName: string;

  @Column('text', { name: 'address' })
  address: string;

  @Column('text', { name: 'phone_number', unique: true })
  phoneNumber: string;

  @Column('text', { name: 'email', nullable: true, unique: true })
  email?: string | null;

  @Column('text', { name: 'document_number', unique: true })
  documentNumber: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt?: Date | null;

  @Column('integer', { name: 'rol_id', nullable: true })
  rolId: number | null;

  @Column('text', { name: 'password', nullable: true })
  password: string | null;

  @Column('integer', { name: 'document_type_id', nullable: true })
  documentTypeId: number | null;

  @Column('integer', { name: 'status_id', nullable: true })
  statusId: number | null;

  @Column('character varying', {
    name: 'blood_type',
    nullable: true,
    length: 10,
  })
  bloodType?: string | null;

  @OneToMany(() => Inventory, (inventory) => inventory.createdBy)
  inventories?: Inventory[];

  @OneToMany(() => AccountPayable, (accountPayable) => accountPayable.createdBy)
  accountPayables?: AccountPayable[];

  @OneToMany(() => Appointment, (appointment) => appointment.assignedTo)
  appointmentsAssigned?: Appointment[];

  @OneToMany(() => Appointment, (appointment) => appointment.createdBy)
  appointments?: Appointment[];

  @OneToMany(() => Attention, (attention) => attention.attentById)
  attentions?: Attention[];

  @OneToMany(() => Customer, (customer) => customer.createdBy)
  customers?: Customer[];

  @OneToMany(() => Expense, (expense) => expense.createdBy)
  expenses?: Expense[];

  @OneToMany(() => InventoryInOut, (inventoryInOut) => inventoryInOut.createdBy)
  inventoryInOuts?: InventoryInOut[];

  @OneToMany(() => Note, (note) => note.createdBy)
  notes?: Note[];

  @OneToMany(() => Payment, (payment) => payment.createdBy)
  payments?: Payment[];

  @OneToMany(() => Permissions, (permissions) => permissions.createdBy)
  permissions?: Permissions[];

  @OneToMany(() => Privileges, (privileges) => privileges.createdBy)
  privileges?: Privileges[] | string[];

  @OneToMany(() => Provider, (provider) => provider.createdBy)
  providers?: Provider[];

  @OneToMany(() => Rol, (rol) => rol.createdBy)
  rols?: Rol[];

  @OneToMany(() => Service, (service) => service.createdBy)
  services?: Service[];

  @OneToMany(() => Survey, (survey) => survey.createdBy)
  surveys?: Survey[];

  @OneToMany(() => SurveyAnswer, (surveyAnswer) => surveyAnswer.assignedTo)
  surveyAnswers?: SurveyAnswer[];

  @OneToMany(() => SurveyAnswer, (surveyAnswer) => surveyAnswer.createdBy)
  surveyAnswersCreated?: SurveyAnswer[];

  @OneToMany(() => Turn, (turn) => turn.createdBy)
  turns?: Turn[];

  @OneToMany(() => TypeTurn, (typeTurn) => typeTurn.createdBy)
  typeTurns?: TypeTurn[];

  @ManyToOne(() => List, (list) => list.usersDocumentType, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'document_type_id', referencedColumnName: 'id' }])
  documentType?: List;

  @ManyToOne(() => Rol, (rol) => rol.users, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
    eager: true,
  })
  @JoinColumn([{ name: 'rol_id', referencedColumnName: 'id' }])
  rol?: Rol | string | null;

  @ManyToOne(() => List, (list) => list.usersStatus, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'status_id', referencedColumnName: 'id' }])
  status?: List;
}
