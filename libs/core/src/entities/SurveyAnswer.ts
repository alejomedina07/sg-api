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
import { Survey } from './Survey';

@Index('survey_answer_assigned_to_id_idx', ['assignedTo'], {})
@Index('survey_answer_created_by_id_idx', ['createdBy'], {})
@Index('survey_answer_pk', ['id'], { unique: true })
@Index('survey_answer_survey_id_idx', ['surveyId'], {})
@Entity('survey_answer', { schema: 'SVY' })
export class SurveyAnswer {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('boolean', {
    name: 'complete',
    nullable: true,
    default: () => 'false',
  })
  complete?: boolean | null;

  @Column('text', { name: 'comment', nullable: true })
  comment?: string | null;

  @Column('timestamp without time zone', { name: 'start_date', nullable: true })
  startDate?: Date | null;

  @Column('timestamp without time zone', { name: 'end_date', nullable: true })
  endDate?: Date | null;

  @Column('integer', { name: 'created_by', nullable: true })
  createdById: number | null;

  @Column('integer', { name: 'assigned_to', nullable: true })
  assignedToId?: number | null;

  @Column('integer', { name: 'survey_id', nullable: true })
  surveyId: number | null;

  @OneToMany(() => Answer, (answer) => answer.surveyAnswer)
  answers?: Answer[];

  @ManyToOne(() => User, (user) => user.surveyAnswers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'assigned_to', referencedColumnName: 'id' }])
  assignedTo?: User;

  @ManyToOne(() => User, (user) => user.surveyAnswersCreated, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'created_by', referencedColumnName: 'id' }])
  createdBy?: User;

  @ManyToOne(() => Survey, (survey) => survey.surveyAnswers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'survey_id', referencedColumnName: 'id' }])
  survey?: Survey;
}
