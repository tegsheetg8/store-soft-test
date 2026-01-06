import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  Index,
} from 'typeorm';
import { ProductCategory } from './product-category.entity';
import { Unit } from './unit.entity';
import { StockInItem } from './stock-in-item.entity';
import { StockOutItem } from './stock-out-item.entity';
import { SaleItem } from './sale-item.entity';
import { StockTakingItem } from './stock-taking-item.entity';

@Entity('products')
@Index(['barcode'])
@Index(['name'])
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true, nullable: true })
  barcode: string;

  @ManyToOne(() => ProductCategory, { nullable: false })
  @JoinColumn({ name: 'categoryId' })
  category: ProductCategory;

  @Column()
  categoryId: number;

  @ManyToOne(() => Unit, { nullable: false })
  @JoinColumn({ name: 'unitId' })
  unit: Unit;

  @Column()
  unitId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  purchasePrice: number;

  @Column('decimal', { precision: 10, scale: 2 })
  salePrice: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  stock: number;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  minStock: number;

  @OneToMany(() => StockInItem, (item) => item.product)
  stockInItems: StockInItem[];

  @OneToMany(() => StockOutItem, (item) => item.product)
  stockOutItems: StockOutItem[];

  @OneToMany(() => SaleItem, (item) => item.product)
  saleItems: SaleItem[];

  @OneToMany(() => StockTakingItem, (item) => item.product)
  stockTakingItems: StockTakingItem[];
}

