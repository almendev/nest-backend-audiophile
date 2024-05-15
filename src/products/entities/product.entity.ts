import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Gallery, Image, Include, Other } from '../interfaces';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  slug: string;

  @Column({ unique: true })
  name: string;

  @Column('json')
  image: Image;

  @ManyToOne(() => Category, (category) => category.id, { eager: true })
  category: Category;

  @Column('json')
  categoryImage: Image;

  @Column()
  new: boolean;

  @Column()
  price: number;

  @Column()
  description: string;

  @Column()
  features: string;

  @Column('json')
  includes: Include[];

  @Column('json')
  gallery: Gallery;

  @Column('json')
  others: Other[];
}
