import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'USERS' })
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({
    type: 'varchar',
    length: 50,
  })
  USER_ID: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  PASSWORD: string;

  @Column({
    type: 'varchar',
    length: 18,
    nullable: true,
  })
  NAME: string;

  @Column({
    type: 'varchar',
    length: 18,
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
    length: 50,
    nullable: true,
  })
  OAUTH_ID: string;

  @Column({
    type: 'varchar',
    length: 18,
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
