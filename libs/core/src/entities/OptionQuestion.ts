import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Answer } from './Answer';
import { Question } from './Question';

@Index('option_question_pk', ['id'], { unique: true })
@Index('option_question_question_id_idx', ['questionId'], {})
@Entity('option_question', { schema: 'SVY' })
export class OptionQuestion {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt?: Date | null;

  @Column('integer', { name: 'question_id', nullable: true })
  questionId: number | null;

  @OneToMany(() => Answer, (answer) => answer.optionQuestion)
  answers?: Answer[];

  @ManyToOne(() => Question, (question) => question.optionQuestions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'question_id', referencedColumnName: 'id' }])
  question?: Question;
}
