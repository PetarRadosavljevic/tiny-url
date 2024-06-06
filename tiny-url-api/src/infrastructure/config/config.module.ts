import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

// Services
import { ApplicationConfigService } from './config.service';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [ApplicationConfigService],
  exports: [ApplicationConfigService],
})
export class ApplicationConfigModule {}
