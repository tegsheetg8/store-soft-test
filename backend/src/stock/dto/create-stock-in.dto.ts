import { IsNumber, IsNotEmpty, IsArray, ValidateNested, Min } from 'class-validator';
import { Type } from 'class-transformer';

class StockInItemDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  price: number;
}

export class CreateStockInDto {
  @IsNumber()
  @IsNotEmpty()
  supplierId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockInItemDto)
  items: StockInItemDto[];
}

