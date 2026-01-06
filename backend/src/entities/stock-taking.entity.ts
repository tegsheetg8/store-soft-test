import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { StockTakingItem } from './stock-taking-item.entity';

@Entity('stock_takings')
export class StockTaking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', nullable: true })
  note: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => StockTakingItem, (item) => item.stockTaking, { cascade: true })
  items: StockTakingItem[];
}

