import { IsOptional } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'TRACKS' })
export class Track extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @Column({ type: 'varchar', length: 18, unique: true })
  DEPARTMENT: string;

  @IsOptional()
  @Column({
    type: 'decimal',
    precision: 5,
    scale: 2,
    default: 0,
  })
  ORDER: number;

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
}
