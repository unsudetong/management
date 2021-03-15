import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TRACKS' })
export class Track extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'varchar', length: 18 })
  DEPARTMENT: string;

  @Column({ type: 'datetime' })
  createdAt: string;

  @Column({ type: 'datetime' })
  updatedAt: string;

  @Column()
  ORDER: number;
}
