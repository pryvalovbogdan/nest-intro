import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable} from 'typeorm';
import { Book } from './book.entity';
import { Genre } from './genre.entity';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 120 })
  fullName: string;

  @Column({ type: 'varchar', length: 500 })
  biography: string;

  @Column({ type: 'smallint' })
  rate: number;

  @ManyToMany(() => Book)
  @JoinTable()
  books: Book[];

  @OneToMany(() => Genre, genre => genre.name)
  genre: Genre[];
}
