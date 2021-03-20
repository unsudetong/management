import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Admin } from '../../admin/entities/admin.entity';
import { Project } from '../../project/entities/project.entity';

@Entity({ name: 'ARTICLES' })
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'text' })
  TITLE: string;

  @Column({ type: 'text' })
  CONTENTS: string;

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
  ADMIN_ID: number;

  @OneToOne(() => Project, project => project.ID)
  @Column()
  PROJECT_ID: number;

  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  ORDER: number;
}
