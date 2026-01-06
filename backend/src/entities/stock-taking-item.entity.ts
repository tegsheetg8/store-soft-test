import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StockTaking } from './stock-taking.entity';
import { Product } from './product.entity';

@Entity('stock_taking_items')
export class StockTakingItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => StockTaking, (stockTaking) => stockTaking.items, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'stockTakingId' })
  stockTaking: StockTaking;

  @Column()
  stockTakingId: number;

  @ManyToOne(() => Product, { nullable: false })
  @JoinColumn({ name: 'productId' })
  product: Product;

  @Column()
  productId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  systemQty: number;

  @Column('decimal', { precision: 10, scale: 2 })
  realQty: number;
}

