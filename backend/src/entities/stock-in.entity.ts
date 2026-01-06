import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Supplier } from './supplier.entity';
import { StockInItem } from './stock-in-item.entity';

@Entity('stock_ins')
export class StockIn {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Supplier, { nullable: false })
  @JoinColumn({ name: 'supplierId' })
  supplier: Supplier;

  @Column()
  supplierId: number;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => StockInItem, (item) => item.stockIn, { cascade: true })
  items: StockInItem[];
}

