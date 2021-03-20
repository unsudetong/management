import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Admin } from '../../admin/entities/admin.entity';
import { Track } from '../../track/entities/track.entity';

@Entity({ name: 'PROJECTS' })
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column()
  TITLE: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: string;

  @Column({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: string;

  @OneToOne(() => Admin, admin => admin.ID)
  @Column()
  WRITER: number;

  @OneToOne(() => Track, track => track.ID)
  @Column()
  TRACK_ID: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  ORDER: number;
}
