import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Genre } from './genre.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  name: string;

  @Column({ type: 'smallint' })
  rate: number;

  @CreateDateColumn({ type: 'timestamp' })
  date: string;

  @OneToMany(() => Genre, genre => genre.name)
  genre: Genre[];
}
