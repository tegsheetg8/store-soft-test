import { IsString, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  barcode?: string;

  @IsNumber()
  @IsNotEmpty()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  unitId: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  purchasePrice: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0)
  salePrice: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  minStock?: number;
}

