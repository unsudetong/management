import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Track } from '../../track/entities/track.entity';
import { User } from '../../user/entities/user.entity';

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

  @OneToOne(() => User, user => user.ID)
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
