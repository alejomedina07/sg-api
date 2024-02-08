import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { Survey } from './Survey';

@Index('survey_category_category_id_idx', ['categoryId'], {})
@Index('survey_category_pk', ['id'], { unique: true })
@Index('survey_category_survey_id_idx', ['surveyId'], {})
@Entity('survey_category', { schema: 'SVY' })
export class SurveyCategory {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('integer', { name: 'survey_id', nullable: true })
  surveyId: number | null;

  @Column('integer', { name: 'category_id', nullable: true })
  categoryId: number | null;

  @ManyToOne(() => Category, (category) => category.surveyCategories, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category?: Category;

  @ManyToOne(() => Survey, (survey) => survey.surveyCategories, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'survey_id', referencedColumnName: 'id' }])
  survey?: Survey;
}
