import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'USERS' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({
    type: 'varchar',
  })
  USER_ID: string;

  @Column({
    type: 'varchar',
  })
  PASSWORD: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  NAME: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  MAJOR: string;

  @Column({
    type: 'int',
    nullable: true,
  })
  STUDENT_ID: number;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  OAUTH_ID: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  DOUBLE_MAJOR: string;

  @Column({ type: 'datetime' })
  createdAt: string;

  @Column({
    type: 'datetime',
  })
  updatedAt: string;
}
