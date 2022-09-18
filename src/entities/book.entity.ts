import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Genre } from './genre.entity';
import { Author } from './author.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  rate: number;

  @Column()
  date: string;

  @ManyToMany(() => Author)
  author: Author[];

  @OneToMany(() => Genre, genre => genre.name)
  genre: Genre[];
}
