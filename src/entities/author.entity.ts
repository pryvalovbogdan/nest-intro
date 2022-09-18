import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany } from 'typeorm';
import { Book } from './book.entity';
import { Genre } from './genre.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  biography: string;

  @Column()
  rate: number;

  @ManyToMany(() => Book)
  books: Book[];

  @OneToMany(() => Genre, genre => genre.name)
  genre: Genre[];
}
