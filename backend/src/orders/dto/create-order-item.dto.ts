import { IsString, IsNumber, IsPositive, IsInt } from 'class-validator';

export class CreateOrderItemDto {
  @IsString()
  productId: string;

  @IsString()
  productName: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsInt()
  @IsPositive()
  quantity: number;
} 