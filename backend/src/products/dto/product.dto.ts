import { IsString, IsNumber, IsOptional, IsArray, IsEnum, IsBoolean, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export enum ProductProvider {
  BRAZILIAN = 'brazilian',
  EUROPEAN = 'european',
}

export class ProductDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string;

  @Transform(({ value }) => typeof value === 'string' ? parseFloat(value) : value)
  @IsNumber()
  price: number;

  @IsString()
  category: string;

  @IsString()
  material: string;

  @IsOptional()
  @IsString()
  department?: string;

  @IsArray()
  @IsString({ each: true })
  gallery: string[];

  @IsEnum(ProductProvider)
  provider: ProductProvider;

  @IsBoolean()
  hasDiscount: boolean;

  @IsOptional()
  @Transform(({ value }) => value !== undefined ? parseFloat(value) : undefined)
  @IsNumber()
  discountValue?: number;
} 