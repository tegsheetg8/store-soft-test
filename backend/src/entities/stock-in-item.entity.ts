import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StockIn } from './stock-in.entity';
import { Product } from './product.entity';

@Entity('stock_in_items')
export class StockInItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StockIn, (stockIn) => stockIn.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'stockInId' })
  stockIn: StockIn;

  @Column()
  stockInId: number;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  productId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}

