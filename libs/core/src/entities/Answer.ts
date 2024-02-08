import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { OptionQuestion } from './OptionQuestion';
import { Question } from './Question';
import { SurveyAnswer } from './SurveyAnswer';
import { Survey } from './Survey';

@Index('answer_pk', ['id'], { unique: true })
@Index('answer_option_question_id_idx', ['optionQuestionId'], {})
@Index('answer_question_id_idx', ['questionId'], {})
@Index('answer_survey_answer_id_idx', ['surveyAnswerId'], {})
@Index('answer_survey_id_idx', ['surveyId'], {})
@Entity('answer', { schema: 'SVY' })
export class Answer {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt: Date | null;

  @Column('integer', { name: 'question_id', nullable: true })
  questionId: number | null;

  @Column('integer', { name: 'option_question_id', nullable: true })
  optionQuestionId: number | null;

  @Column('text', { name: 'text_answer', nullable: true })
  textAnswer?: string | null;

  @Column('integer', { name: 'survey_answer_id', nullable: true })
  surveyAnswerId: number | null;

  @Column('integer', { name: 'survey_id', nullable: true })
  surveyId: number | null;

  @ManyToOne(() => OptionQuestion, (optionQuestion) => optionQuestion.answers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'option_question_id', referencedColumnName: 'id' }])
  optionQuestion?: OptionQuestion;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'question_id', referencedColumnName: 'id' }])
  question?: Question;

  @ManyToOne(() => SurveyAnswer, (surveyAnswer) => surveyAnswer.answers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'survey_answer_id', referencedColumnName: 'id' }])
  surveyAnswer?: SurveyAnswer;

  @ManyToOne(() => Survey, (survey) => survey.answers, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn([{ name: 'survey_id', referencedColumnName: 'id' }])
  survey?: Survey;
}
