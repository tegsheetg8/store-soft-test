import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { StockOutItem } from './stock-out-item.entity';

@Entity('stock_outs')
export class StockOut {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => StockOutItem, (item) => item.stockOut, { cascade: true })
  items: StockOutItem[];
}

