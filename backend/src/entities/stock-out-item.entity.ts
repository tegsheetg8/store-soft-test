import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StockOut } from './stock-out.entity';
import { Product } from './product.entity';

@Entity('stock_out_items')
export class StockOutItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StockOut, (stockOut) => stockOut.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'stockOutId' })
  stockOut: StockOut;

  @Column()
  stockOutId: number;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  productId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;
}

