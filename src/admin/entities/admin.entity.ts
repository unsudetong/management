import {
  BaseEntity,
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';

@Entity({ name: 'ADMINS' })
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  ID: number;

  @OneToOne(() => User, user => user.ID)
  @Column({
    unique: true,
  })
  USER_ID: number;

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
