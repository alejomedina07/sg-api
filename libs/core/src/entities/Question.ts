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
import { OptionQuestion } from './OptionQuestion';
import { Category } from './Category';

@Index('question_category_id_idx', ['categoryId'], {})
@Index('question_pk', ['id'], { unique: true })
@Entity('question', { schema: 'SVY' })
export class Question {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('text', { name: 'name' })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('boolean', { name: 'status', nullable: true, default: () => 'true' })
  status: boolean | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt?: Date | null;

  @Column('integer', { name: 'category_id', nullable: true })
  categoryId: number | null;

  @Column('character varying', { name: 'type', length: 50 })
  type: string;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers?: Answer[];

  @OneToMany(() => OptionQuestion, (optionQuestion) => optionQuestion.question)
  optionQuestions?: OptionQuestion[];

  @ManyToOne(() => Category, (category) => category.questions, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category?: Category;
}
