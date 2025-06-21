import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ProductDto, ProductProvider } from './dto/product.dto';

@Injectable()
export class ProductStandardizationService {
  /**
   * Padroniza um array de dados brutos em um array de ProductDto.
   */
  standardizeMany(rawData: any[]): ProductDto[] {
    const flatData = this.flattenMalformedObjects(rawData);
    const standardized = flatData
      .map((item) => this.standardizeOne(item))
      .filter(Boolean);
    // Valida e transforma para ProductDto
    return plainToInstance(ProductDto, standardized, { enableImplicitConversion: true });
  }

  /**
   * Lida com objetos malformados que possuem chaves numéricas aninhando produtos.
   */
  private flattenMalformedObjects(data: any[]): any[] {
    const result: any[] = [];
    for (const item of data) {
      // Se o objeto tem chaves numéricas, extrai cada uma como produto
      const numericKeys = Object.keys(item).filter((k) => !isNaN(Number(k)));
      if (numericKeys.length > 0) {
        for (const key of numericKeys) {
          result.push({ ...item[key], provider: item.provider });
        }
        // Também processa o objeto "pai" se ele for um produto válido
        const nonNumeric = { ...item };
        numericKeys.forEach((k) => delete nonNumeric[k]);
        // Se sobrou um produto válido, adiciona
        if (nonNumeric.nome || nonNumeric.name) {
          result.push(nonNumeric);
        }
      } else {
        result.push(item);
      }
    }
    return result;
  }

  /**
   * Padroniza um único produto, delegando para o método do provider correto.
   */
  private standardizeOne(data: any): Partial<ProductDto> | null {
    if (data.provider === ProductProvider.BRAZILIAN || data.nome) {
      return this.transformFromBrazilian(data);
    }
    if (data.provider === ProductProvider.EUROPEAN || data.name) {
      return this.transformFromEuropean(data);
    }
    // Ignora objetos irrelevantes
    return null;
  }

  /**
   * Transforma dados do fornecedor brasileiro para o padrão ProductDto.
   */
  private transformFromBrazilian(data: any): Partial<ProductDto> {
    return {
      id: String(data.id),
      name: data.nome,
      description: data.descricao,
      price: parseFloat(data.preco),
      category: data.categoria,
      material: data.material || '',
      department: data.departamento,
      gallery: data.imagem ? [data.imagem] : [],
      provider: ProductProvider.BRAZILIAN,
      hasDiscount: false,
    };
  }

  /**
   * Transforma dados do fornecedor europeu para o padrão ProductDto.
   */
  private transformFromEuropean(data: any): Partial<ProductDto> {
    return {
      id: String(data.id),
      name: data.name,
      description: data.description,
      price: parseFloat(data.price),
      category: data.details?.adjective || '',
      material: data.details?.material || '',
      department: undefined,
      gallery: Array.isArray(data.gallery) ? data.gallery : [],
      provider: ProductProvider.EUROPEAN,
      hasDiscount: !!data.hasDiscount,
      discountValue: data.discountValue ? parseFloat(data.discountValue) : undefined,
    };
  }
} 