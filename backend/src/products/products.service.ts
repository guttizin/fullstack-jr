import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, map, catchError } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);
  private readonly brazilianProviderUrl = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider';
  private readonly europeanProviderUrl = 'http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider';

  constructor(private readonly httpService: HttpService) {}

  async findAll() {
    const brazilianProducts$ = this.httpService.get(this.brazilianProviderUrl).pipe(
      map(response => response.data.map(p => ({...p, provider: 'brazilian' }))),
      catchError(error => {
        this.logger.error('Failed to fetch from Brazilian provider', error.stack);
        return []; // Return empty array in case of error
      }),
    );

    const europeanProducts$ = this.httpService.get(this.europeanProviderUrl).pipe(
      map(response => response.data.map(p => ({...p, provider: 'european' }))),
      catchError(error => {
        this.logger.error('Failed to fetch from European provider', error.stack);
        return []; // Return empty array in case of error
      }),
    );

    const [brazilianProducts, europeanProducts] = await Promise.all([
      firstValueFrom(brazilianProducts$),
      firstValueFrom(europeanProducts$),
    ]);

    return [...brazilianProducts, ...europeanProducts];
  }
} 