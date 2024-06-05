import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Index('banner_pk', ['id'], { unique: true })
@Entity('banner', { schema: 'CNFG' })
export class Banner {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id?: number;

  @Column('character varying', { name: 'name', length: 200 })
  name: string;

  @Column('text', { name: 'description', nullable: true })
  description: string | null;

  @Column('boolean', { name: 'status', nullable: true, default: () => 'true' })
  status?: boolean | null;

  @Column('timestamp without time zone', {
    name: 'created_at',
    nullable: true,
    default: () => 'now()',
  })
  createdAt?: Date | null;

  @Column('character varying', { name: 'photo', nullable: true, length: 200 })
  photo?: string | null;
}
