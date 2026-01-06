import { IsString, IsNotEmpty, IsArray, ValidateNested, Min, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

class StockOutItemDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0.01)
  quantity: number;
}

export class CreateStockOutDto {
  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockOutItemDto)
  items: StockOutItemDto[];
}

