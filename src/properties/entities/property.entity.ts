import { UserEntity } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Timestamp,
  UpdateDateColumn,
} from 'typeorm';

@Entity('properties')
export class PropertyEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  discription: string;
  @Column()
  address: string;
  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Timestamp;
  @UpdateDateColumn()
  updatedAt: Timestamp;

  @ManyToOne(() => UserEntity, (user) => user.properties)
  addedBy: UserEntity;
}
