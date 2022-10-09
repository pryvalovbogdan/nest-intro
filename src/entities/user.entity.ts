import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', length: 120 })
  public firstName: string;

  @Column({ type: 'varchar', length: 120 })
  public lastName: string;

  @Column({ type: 'varchar', length: 120, unique: true })
  public email: string;

  @Column({ type: 'varchar', length: 50 })
  public accountType: string;

  @Column({ type: 'boolean', default: false })
  public isDeleted: boolean;

  @Column({ type: 'varchar', length: 120 })
  public password: string;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
