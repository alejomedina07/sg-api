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
import { User } from './User';
import { SurveyAnswer } from './SurveyAnswer';
import { SurveyCategory } from './SurveyCategory';

@Index('survey_created_by_id_idx', ['createdBy'], {})
@Index('survey_pk', ['id'], { unique: true })
@Entity('survey', { schema: 'SVY' })
export class Survey {
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

  @Column('integer', { name: 'created_by', nullable: true })
  createdById?: number | null;

  @Column('boolean', { name: 'status', nullable: true, default: () => 'true' })
  status: boolean | null;

  @Column('boolean', {
    name: 'anonymous',
    nullable: true,
    default: () => 'false',
  })
  anonymous: boolean | null;

  @Column('boolean', {
    name: 'all_users',
    nullable: true,
    default: () => 'false',
  })
  allUsers?: boolean | null;

  @OneToMany(() => Answer, (answer) => answer.survey)
  answers?: Answer[];

  @ManyToOne(() => User, (user) => user.surveys, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy?: User;

  @OneToMany(() => SurveyAnswer, (surveyAnswer) => surveyAnswer.survey)
  surveyAnswers?: SurveyAnswer[];

  @OneToMany(() => SurveyCategory, (surveyCategory) => surveyCategory.survey)
  surveyCategories?: SurveyCategory[];
}
