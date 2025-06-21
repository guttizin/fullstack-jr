import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { ProductStandardizationService } from './product-standardization.service';

@Module({
  imports: [HttpModule],
  controllers: [ProductsController],
  providers: [ProductsService, ProductStandardizationService],
  exports: [ProductsService, ProductStandardizationService],
})
export class ProductsModule {} 