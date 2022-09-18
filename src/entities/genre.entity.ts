import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Book } from './book.entity';
import { Author } from './author.entity';

@Entity()
export class Genre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Book, book => book.genre)
  book: Book;

  @ManyToOne(() => Author, author => author.genre)
  author: Author;
}
