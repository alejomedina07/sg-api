import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Question } from './Question';
import { SurveyCategory } from './SurveyCategory';

@Index('category_pk', ['id'], { unique: true })
@Entity('category', { schema: 'SVY' })
export class Category {
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

  @Column('boolean', { name: 'status', nullable: true, default: () => 'true' })
  status: boolean | null;

  @OneToMany(() => Question, (question) => question.category)
  questions?: Question[];

  @OneToMany(() => SurveyCategory, (surveyCategory) => surveyCategory.category)
  surveyCategories?: SurveyCategory[];
}
