import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
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

  @Column({ type: 'datetime' })
  createdAt: string;

  @Column({ type: 'datetime' })
  updatedAt: string;

  @OneToMany(() => Admin, admin => admin.ID)
  @Column()
  ADMIN_ID: number;

  @OneToMany(() => Project, project => project.ID)
  @Column()
  PROJECT_ID: number;

  @Column()
  ORDER: number;
}
