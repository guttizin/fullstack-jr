import { Controller, Get, Post, Body, ValidationPipe, Query, ParseIntPipe, DefaultValuePipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductStandardizationService } from './product-standardization.service';
import { ProductDto } from './dto/product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly productStandardizationService: ProductStandardizationService,
  ) {}

  // @Get()
  // findAll() {
  //   return this.productsService.findAll();
  // }

  /**
   * Recebe um array de dados brutos e retorna um array padronizado de ProductDto.
   */
  @Post('standardize')
  standardizeMany(
    @Body(new ValidationPipe({ transform: true, whitelist: true })) rawData: any[],
  ): ProductDto[] {
    return this.productStandardizationService.standardizeMany(rawData);
  }

  /**
   * Retorna todos os produtos dos providers já padronizados.
   */
  @Get()
  async findAllStandardized(
    @Query('category') category?: string | string[],
    @Query('material') material?: string | string[],
    @Query('minPrice', new DefaultValuePipe(0), ParseIntPipe) minPrice?: number,
    @Query('maxPrice', new DefaultValuePipe(3000), ParseIntPipe) maxPrice?: number,
    @Query('_page', new DefaultValuePipe(1), ParseIntPipe) page?: number,
    @Query('_limit', new DefaultValuePipe(20), ParseIntPipe) limit?: number,
    @Query('sortBy') sortBy?: string,
  ): Promise<{ data: ProductDto[], total: number, categories: string[], materials: string[] }> {
    const rawProducts = await this.productsService.findAll();
    let standardizedProducts = this.productStandardizationService.standardizeMany(rawProducts);

    // Normalize category and material filters to arrays
    const categoryFilters = Array.isArray(category) ? category : category ? [category] : [];
    const materialFilters = Array.isArray(material) ? material : material ? [material] : [];

    // Apply filters
    const filteredProducts = standardizedProducts.filter(p => {
        const byCategory = categoryFilters.length === 0 || categoryFilters.some(cat => 
            p.category.toLowerCase() === cat.toLowerCase()
        );
        const byMaterial = materialFilters.length === 0 || materialFilters.some(mat => 
            p.material.toLowerCase() === mat.toLowerCase()
        );
        const byPrice = p.price >= minPrice && p.price <= maxPrice;
        return byCategory && byMaterial && byPrice;
    });

    // Apply sorting
    let sortedProducts = [...filteredProducts];
    if (sortBy) {
        switch (sortBy) {
            case 'price_low_high':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price_high_low':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'popularity':
                // For now, sort by name as a placeholder for popularity
                sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
                break;
            default:
                // Default sorting (no change)
                break;
        }
    }

    const total = sortedProducts.length;

    const startIndex = (page - 1) * limit;
    const paginatedProducts = sortedProducts.slice(startIndex, startIndex + limit);

    return { 
        data: paginatedProducts, 
        total, 
        categories: Array.from(new Set(standardizedProducts.map(p => p.category))), 
        materials: Array.from(new Set(standardizedProducts.map(p => p.material))) 
    };
  }
} 