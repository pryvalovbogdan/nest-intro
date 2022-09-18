import { Entity, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { Book } from './book.entity';
import { Author } from './author.entity';

@Entity()
export class AuthorsBooks {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToMany(() => Book)
  books: Book[];

  @ManyToMany(() => Author)
  authors: Author[];
}
