import {
  IsString,
  IsOptional,
  IsArray,
  ValidateNested,
  Min,
  IsNumber,
  IsNotEmpty,
} from "class-validator";
import { Type } from "class-transformer";

class StockTakingItemDto {
  @IsNumber()
  @IsNotEmpty()
  productId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  realQty: number;
}

export class CreateStockTakingDto {
  @IsString()
  @IsOptional()
  note?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StockTakingItemDto)
  items: StockTakingItemDto[];
}
