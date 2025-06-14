import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class AppService {
  private counter = 0;

  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getData(key: string): Promise<string> {
    // Incrementa o contador para cada visita
    this.counter++;
    
    // Tenta obter dados do cache
    const cachedData = await this.cacheManager.get<string>(key);
    if (cachedData) {
      console.log(`Dados obtidos do cache - Visita #${this.counter}`);
      return `${cachedData} (Visita #${this.counter} - do cache)`;
    }

    // Se não estiver no cache, gera novo dado (dados limpos sem informação de visita)
    const cleanData = `Dados do banco de dados - obtidos em ${new Date().toLocaleString()}`;
    // Salva apenas os dados limpos no cache por 1 hora (TTL em segundos)
    await this.cacheManager.set(key, cleanData, 3600);
    console.log(`Dados obtidos do banco de dados - Visita #${this.counter}`);
    return `${cleanData} (Visita #${this.counter} - do banco de dados)`;
  }

  async invalidateCache(key: string): Promise<void> {
    await this.cacheManager.del(key);
    console.log(`Cache invalidado para a chave: ${key}`);
  }
} 