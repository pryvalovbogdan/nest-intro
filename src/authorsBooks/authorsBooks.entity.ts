import { Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Book } from '../book/book.entity';
import { Author } from '../author/author.entity';

@Entity()
export class AuthorsBooks {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Book)
  books: Book[];

  @ManyToMany(() => Author)
  authors: Author[];
}
