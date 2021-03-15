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

  @Column({ type: 'datetime' })
  createdAt: string;

  @Column({ type: 'datetime' })
  updatedAt: string;

  @OneToMany(() => User, user => user.ID)
  @Column()
  WRITER: number;

  @OneToOne(() => Track, track => track.ID)
  @Column()
  TRACK_ID: number;

  @Column()
  ORDER: number;
}
