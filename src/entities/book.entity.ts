import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
} from 'typeorm';
import { Genre } from './genre.entity';
import { Author } from './author.entity';

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

  @ManyToMany(() => Author)
  author: Author[];

  @OneToMany(() => Genre, genre => genre.name)
  genre: Genre[];
}
