import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Procedure } from './Procedure';

@Index('procedure_procedure_id_children', ['procedureIdChildren'], {})
@Index('procedure_procedure_id_parent_idx', ['procedureIdParent'], {})
@Entity('procedure_procedure', { schema: 'SVC' })
export class ProcedureProcedure {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id: number;

  @Column('integer', { name: 'procedure_id_parent', nullable: true })
  procedureIdParentId: number | null;

  @Column('integer', { name: 'procedure_id_children', nullable: true })
  procedureIdChildrenId: number | null;

  @ManyToOne(
    () => Procedure,
    (procedure) => procedure.procedureProceduresChildren,
    {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'procedure_id_children', referencedColumnName: 'id' }])
  procedureIdChildren?: Procedure;

  @ManyToOne(
    () => Procedure,
    (procedure) => procedure.procedureProceduresParent,
    {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    },
  )
  @JoinColumn([{ name: 'procedure_id_parent', referencedColumnName: 'id' }])
  procedureIdParent?: Procedure;
}
