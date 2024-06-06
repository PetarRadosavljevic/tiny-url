import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApplicationConfigService {
  constructor(private configService: ConfigService) {}

  getAppPort(): number {
    return this.configService.get<number>('PORT') ?? 4000;
  }

  /**
   * @returns MongoDB connection URL.
   */
  getDatabaseConnectionUrl(): string {
    return `mongodb://${this.configService.get<string>(
      'DATABASE_USER',
    )}:${this.configService.get<string>(
      'DATABASE_PASSWORD',
    )}@${this.configService.get<string>(
      'DATABASE_HOST',
    )}:${this.configService.get<string>(
      'DATABASE_PORT',
    )}/${this.configService.get<string>('DATABASE_NAME')}`;
  }
}
